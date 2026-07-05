import type * as RAPIER from "@dimforge/rapier3d-compat";
import type { Transform3d } from "../components/general";
import type { RigidBody } from "../components/physics";
import type { System, World } from "../mecs";

type Vec3 = { x: number, y: number, z: number };

type SyncedProps = {
    // bounciness
    restitution?: number,
    friction?: number,
    density?: number,
    gravityScale?: number,
    // drag
    linearDamping?: number,
    // angular drag
    angularDamping?: number,
    lockRotations?: boolean
};

type Pose = { px: number, py: number, pz: number, rx: number, ry: number, rz: number, rw: number };

type BodyHandle = {
    body: RAPIER.RigidBody,
    collider: RAPIER.Collider,
    synced: SyncedProps,
    pose: Pose,
    velSnap: Vec3,
    angSnap: Vec3
};

export class PhysicsSystem implements System {
    private ecs: World;
    private gravity: Vec3;
    private rapier?: typeof import("@dimforge/rapier3d-compat");
    private world?: RAPIER.World;
    private handles: Map<number, BodyHandle> = new Map();
    private disposed = false;

    constructor(world: World, gravity: Vec3 = { x: 0, y: -9.81, z: 0 }) {
        this.ecs = world;
        this.gravity = gravity;

        world.onAttach<RigidBody>("RigidBody", (entity, rb) => {
            if (this.world) this.realize(entity, rb);
        });

        world.onDetach<RigidBody>("RigidBody", (entity) => {
            const h = this.handles.get(entity);
            if (h && this.world) {
                this.world.removeRigidBody(h.body);
                this.handles.delete(entity);
            }
        });

        this.init().catch((e) => console.error("physics init FALIED?", e));
    }

    dispose(): void {
        this.disposed = true;
        this.handles.clear();
        if (this.world) {
            this.world.free();
            this.world = undefined;
        }
    }

    private async init(): Promise<void> {
        const rapier = await import("@dimforge/rapier3d-compat");
        if (this.disposed) return;
        await rapier.init();
        if (this.disposed) return;

        this.rapier = rapier;
        this.world = new rapier.World(this.gravity);

        for (const [entity, rb] of this.ecs.view<[RigidBody]>("RigidBody"))
            this.realize(entity, rb);
    }

    // a lot of ts exists to keep rapier self contained, because its annoying to include
    private realize(entity: number, rb: RigidBody): void {
        const rapier = this.rapier!;
        const world = this.world!;

        const t = this.ecs.view<[Transform3d]>("Transform3d").find(([e]) => e === entity)?.[1];

        let bodyDesc: RAPIER.RigidBodyDesc;
        switch (rb.type) {
            case "dynamic": bodyDesc = rapier.RigidBodyDesc.dynamic(); break;
            case "fixed": bodyDesc = rapier.RigidBodyDesc.fixed(); break;
            case "kinematicPosition": bodyDesc = rapier.RigidBodyDesc.kinematicPositionBased(); break;
            case "kinematicVelocity": bodyDesc = rapier.RigidBodyDesc.kinematicVelocityBased(); break;
        }

        if (t) {
            bodyDesc.setTranslation(t.position.x, t.position.y, t.position.z);
            bodyDesc.setRotation({ x: t.rotation.x, y: t.rotation.y, z: t.rotation.z, w: t.rotation.w });
        }
        if (rb.gravityScale !== undefined) bodyDesc.setGravityScale(rb.gravityScale);
        if (rb.linearDamping !== undefined) bodyDesc.setLinearDamping(rb.linearDamping);
        if (rb.angularDamping !== undefined) bodyDesc.setAngularDamping(rb.angularDamping);
        if (rb.lockRotations) bodyDesc.lockRotations();
        if (rb.velocity) bodyDesc.setLinvel(rb.velocity.x, rb.velocity.y, rb.velocity.z);
        if (rb.angularVelocity) bodyDesc.setAngvel({ x: rb.angularVelocity.x, y: rb.angularVelocity.y, z: rb.angularVelocity.z });

        let colliderDesc: RAPIER.ColliderDesc | null;
        switch (rb.shape.kind) {
            case "cuboid": colliderDesc = rapier.ColliderDesc.cuboid(rb.shape.hx, rb.shape.hy, rb.shape.hz); break;
            case "ball": colliderDesc = rapier.ColliderDesc.ball(rb.shape.radius); break;
            case "capsule": colliderDesc = rapier.ColliderDesc.capsule(rb.shape.halfHeight, rb.shape.radius); break;
            case "trimesh": colliderDesc = rapier.ColliderDesc.trimesh(rb.shape.vertices, rb.shape.indices); break;
            case "convexHull": colliderDesc = rapier.ColliderDesc.convexHull(rb.shape.points); break;
        }

        if (!colliderDesc) {
            console.error("physics: failed to build collider for entity", entity, rb.shape.kind);
            return;
        }

        if (rb.restitution !== undefined) colliderDesc.setRestitution(rb.restitution);
        if (rb.friction !== undefined) colliderDesc.setFriction(rb.friction);
        if (rb.density !== undefined) colliderDesc.setDensity(rb.density);

        const body = world.createRigidBody(bodyDesc);
        const collider = world.createCollider(colliderDesc, body);

        // DONT LOOK
        this.handles.set(entity, {
            body,
            collider,
            synced: {
                restitution: rb.restitution,
                friction: rb.friction,
                density: rb.density,
                gravityScale: rb.gravityScale,
                linearDamping: rb.linearDamping,
                angularDamping: rb.angularDamping,
                lockRotations: rb.lockRotations
            },
            pose: t
                ? { px: t.position.x, py: t.position.y, pz: t.position.z, rx: t.rotation.x, ry: t.rotation.y, rz: t.rotation.z, rw: t.rotation.w }
                : { px: 0, py: 0, pz: 0, rx: 0, ry: 0, rz: 0, rw: 1 },
            velSnap: rb.velocity ? { x: rb.velocity.x, y: rb.velocity.y, z: rb.velocity.z } : { x: 0, y: 0, z: 0 },
            angSnap: rb.angularVelocity ? { x: rb.angularVelocity.x, y: rb.angularVelocity.y, z: rb.angularVelocity.z } : { x: 0, y: 0, z: 0 }
        });
    }

    // kinda hacky property syncing but this lets us modify component properties at runtime. in pure ecs fashion the simulation would read frmo the component directly but we rely on rapier so ggs
    private sync(h: BodyHandle, rb: RigidBody): void {
        const s = h.synced;

        if (rb.restitution !== s.restitution) {
            h.collider.setRestitution(rb.restitution ?? 0);
            s.restitution = rb.restitution;
        }
        if (rb.friction !== s.friction) {
            h.collider.setFriction(rb.friction ?? 0.5);
            s.friction = rb.friction;
        }
        if (rb.density !== s.density) {
            if (rb.density !== undefined) h.collider.setDensity(rb.density);
            s.density = rb.density;
        }
        if (rb.gravityScale !== s.gravityScale) {
            h.body.setGravityScale(rb.gravityScale ?? 1, true);
            s.gravityScale = rb.gravityScale;
        }
        if (rb.linearDamping !== s.linearDamping) {
            h.body.setLinearDamping(rb.linearDamping ?? 0);
            s.linearDamping = rb.linearDamping;
        }
        if (rb.angularDamping !== s.angularDamping) {
            h.body.setAngularDamping(rb.angularDamping ?? 0);
            s.angularDamping = rb.angularDamping;
        }
        if (rb.lockRotations !== s.lockRotations) {
            const enabled = !(rb.lockRotations ?? false);
            h.body.setEnabledRotations(enabled, enabled, enabled, true);
            s.lockRotations = rb.lockRotations;
        }
    }

    // sync transform pos & rot -> rigidbody if different
    private pullPose(h: BodyHandle, t: Transform3d): void {
        const p = h.pose;
        if (t.position.x === p.px && t.position.y === p.py && t.position.z === p.pz
            && t.rotation.x === p.rx && t.rotation.y === p.ry && t.rotation.z === p.rz && t.rotation.w === p.rw)
            return;

        h.body.setTranslation({ x: t.position.x, y: t.position.y, z: t.position.z }, true);
        h.body.setRotation({ x: t.rotation.x, y: t.rotation.y, z: t.rotation.z, w: t.rotation.w }, true);
        this.recordPose(h, t);
    }

    // sync rigidbody -> transform 
    private pushPose(h: BodyHandle, t: Transform3d): void {
        const p = h.body.translation();
        t.position.set(p.x, p.y, p.z);
        const r = h.body.rotation();
        t.rotation.set(r.x, r.y, r.z, r.w);
        this.recordPose(h, t);
    }

    // records transform -> handle
    private recordPose(h: BodyHandle, t: Transform3d): void {
        h.pose.px = t.position.x; h.pose.py = t.position.y; h.pose.pz = t.position.z;
        h.pose.rx = t.rotation.x; h.pose.ry = t.rotation.y; h.pose.rz = t.rotation.z; h.pose.rw = t.rotation.w;
    }

    // same thing with position but w velocity thank god for claude
    private pullVelocity(h: BodyHandle, rb: RigidBody): void {
        if (rb.velocity && (rb.velocity.x !== h.velSnap.x || rb.velocity.y !== h.velSnap.y || rb.velocity.z !== h.velSnap.z)) {
            h.body.setLinvel({ x: rb.velocity.x, y: rb.velocity.y, z: rb.velocity.z }, true);
            h.velSnap.x = rb.velocity.x; h.velSnap.y = rb.velocity.y; h.velSnap.z = rb.velocity.z;
        }
        if (rb.angularVelocity && (rb.angularVelocity.x !== h.angSnap.x || rb.angularVelocity.y !== h.angSnap.y || rb.angularVelocity.z !== h.angSnap.z)) {
            h.body.setAngvel({ x: rb.angularVelocity.x, y: rb.angularVelocity.y, z: rb.angularVelocity.z }, true);
            h.angSnap.x = rb.angularVelocity.x; h.angSnap.y = rb.angularVelocity.y; h.angSnap.z = rb.angularVelocity.z;
        }
    }

    private pushVelocity(h: BodyHandle, rb: RigidBody): void {
        const lv = h.body.linvel();
        if (rb.velocity) { rb.velocity.x = lv.x; rb.velocity.y = lv.y; rb.velocity.z = lv.z; }
        else rb.velocity = { x: lv.x, y: lv.y, z: lv.z };
        h.velSnap.x = lv.x; h.velSnap.y = lv.y; h.velSnap.z = lv.z;

        const av = h.body.angvel();
        if (rb.angularVelocity) { rb.angularVelocity.x = av.x; rb.angularVelocity.y = av.y; rb.angularVelocity.z = av.z; }
        else rb.angularVelocity = { x: av.x, y: av.y, z: av.z };
        h.angSnap.x = av.x; h.angSnap.y = av.y; h.angSnap.z = av.z;
    }

    tick(world: World, dt: number): void {
        if (!this.world) return;

        for (const [entity, rb, t] of world.view<[RigidBody, Transform3d]>("RigidBody", "Transform3d")) {
            const h = this.handles.get(entity);
            if (!h) continue;

            this.sync(h, rb);
            this.pullPose(h, t);
            this.pullVelocity(h, rb);
        }

        // pull modified data and then push derived data
        this.world.step();

        for (const [entity, rb, t] of world.view<[RigidBody, Transform3d]>("RigidBody", "Transform3d")) {
            const h = this.handles.get(entity);
            if (!h || h.body.isFixed()) continue;

            this.pushPose(h, t);
            this.pushVelocity(h, rb);
        }
    }
}

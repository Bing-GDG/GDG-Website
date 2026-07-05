export type BodyType = "dynamic" | "fixed" | "kinematicPosition" | "kinematicVelocity";

export type ColliderShape =
    | { kind: "cuboid", hx: number, hy: number, hz: number }
    | { kind: "ball", radius: number }
    | { kind: "capsule", halfHeight: number, radius: number }
    | { kind: "trimesh", vertices: Float32Array, indices: Uint32Array }
    | { kind: "convexHull", points: Float32Array };

export type RigidBody = {
    type: BodyType,
    shape: ColliderShape,
    restitution?: number,
    friction?: number,
    density?: number,
    gravityScale?: number,
    linearDamping?: number,
    angularDamping?: number,
    lockRotations?: boolean,
    velocity?: { x: number, y: number, z: number },
    angularVelocity?: { x: number, y: number, z: number }
}

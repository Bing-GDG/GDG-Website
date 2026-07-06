import { Euler, Vector3 } from "three";
import type { Transform3d } from "../components/general";
import type { ThreeCamera } from "../components/graphics";
import type { RigidBody } from "../components/physics";
import type { MainPlayer } from "../components/player";
import type { System, World } from "../mecs";

const MOVE_SPEED_INFLATION = 2;
const JUMP_CD_MS = 100;

export class MovementSystem implements System {
    private lastJumpTime: number = 0;

    init(world: World) {
        this.lastJumpTime = world.time;
    }

    tick(world: World, dt: number): void {
        // input -> movement
        const input = world.input;

        const viewResult = world.view<[MainPlayer, Transform3d, ThreeCamera, RigidBody]>
            ("MainPlayer", "Transform3d", "ThreeCamera", "RigidBody");

        if (viewResult.length === 0) return;

        const [e, mainPlayer, t, cam, rb] = viewResult[0];

        const forward = new Vector3(0, 0, -1).applyQuaternion(cam.camera.quaternion);
        const right = new Vector3(1, 0, 0).applyQuaternion(cam.camera.quaternion);
        const worldUp = new Vector3(0, 1, 0);
        
        // horizontal movement 
        const hoz = new Vector3();
        if (input.keyPress("w")) hoz.add(forward);
        if (input.keyPress("s")) hoz.sub(forward);
        if (input.keyPress("d")) hoz.add(right);
        if (input.keyPress("a")) hoz.sub(right);

        // project away the (world) Y component, finalize horizontal movement
        // (just wasd for now)
        hoz.projectOnPlane(worldUp).normalize()
            .multiplyScalar(mainPlayer.moveSpeed * MOVE_SPEED_INFLATION * dt);

        if (hoz.lengthSq() > 0) {
            const vec = hoz;
            rb.velocity!.x += vec.x;
            rb.velocity!.z += vec.z;
        }

        // vertical movement (jump)
        const vert = new Vector3();
        if (input.keyDown(" ") && world.time - this.lastJumpTime > JUMP_CD_MS) {
            vert.y = mainPlayer.jumpPower;
            this.lastJumpTime = world.time;
        }

        if (input.keyPress("e")) vert.y += 1;
        if (input.keyPress("q")) vert.y -= 1;

        if (vert.lengthSq() > 0) {
            const vec = vert;
            rb.velocity!.y = vec.y;
        }

        // record new state
        this.updateStates();
    }

    private updateStates() {
        // update state like in air etc
    }
}
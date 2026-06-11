import { Vector3 } from "three";
import type { Transform3d } from "../components/general";
import type { ThreeCamera } from "../components/graphics";
import type { System, World } from "../mecs";

const LOOK_SENSITIVITY = 0.005;
const MOVE_SPEED = 5;
const PITCH_LIMIT = Math.PI / 2 - 0.01;

/// freecam flying - hold left mouse and drag to look, wasd to move, q/e for down/up
export class CameraControlSystem implements System {
    tick(world: World, dt: number): void {
        const input = world.input;

        for (const [entity, c, t] of world.view<[ThreeCamera, Transform3d]>("ThreeCamera", "Transform3d")) {
            if (input.mousePress(0)) {
                const delta = input.mouseDelta;
                t.rotation.y -= delta.x * LOOK_SENSITIVITY;
                t.rotation.x -= delta.y * LOOK_SENSITIVITY;
                t.rotation.x = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, t.rotation.x));
            }

            const forward = new Vector3(
                -Math.sin(t.rotation.y) * Math.cos(t.rotation.x),
                Math.sin(t.rotation.x),
                -Math.cos(t.rotation.y) * Math.cos(t.rotation.x)
            );
            const right = new Vector3(Math.cos(t.rotation.y), 0, -Math.sin(t.rotation.y));

            const move = new Vector3();
            if (input.keyPress("w")) move.add(forward);
            if (input.keyPress("s")) move.sub(forward);
            if (input.keyPress("d")) move.add(right);
            if (input.keyPress("a")) move.sub(right);
            if (input.keyPress("e")) move.y += 1;
            if (input.keyPress("q")) move.y -= 1;

            if (move.lengthSq() > 0)
                t.position.add(move.normalize().multiplyScalar(MOVE_SPEED * dt));
        }
    }
}

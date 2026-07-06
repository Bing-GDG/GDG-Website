import { Euler, Quaternion, Vector3 } from "three";
import type { Transform3d } from "../components/general";
import type { ThreeCamera } from "../components/graphics";
import type { System, World } from "../mecs";
import type { MainPlayer } from "../components/player";

const PITCH_LIMIT = Math.PI / 2 - 0.01;

export class CameraSystem implements System {
    private yaw = 0;
    private pitch = 0;

    init(world: World) {
        world.input.lock("Locked");
    }

    tick(world: World, dt: number): void {
        const input = world.input;

        const viewResult = world.view<[MainPlayer, ThreeCamera, Transform3d]>("MainPlayer", "ThreeCamera", "Transform3d");

        if (viewResult.length === 0) return;

        const [entity, player, c, t] = viewResult[0];

        // look around 
        const delta = input.mouseDelta;
        this.yaw -= delta.x * player.lookSensitivity;
        this.pitch -= delta.y * player.lookSensitivity;
        this.pitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, this.pitch));

        // TODO! we'd probably want to set the transform's rotation for meshes and stuff later
        // but not rn, and not on all axes for sure.
        // t.rotation.setFromEuler(new Euler(this.pitch, this.yaw, 0, "YXZ"));
        const rq = new Quaternion().setFromEuler(new Euler(this.pitch, this.yaw, 0, "YXZ"));

        // do the thing (sync position + rot)
        c.camera.position.copy(t.position);
        c.camera.quaternion.copy(rq);
    }
}

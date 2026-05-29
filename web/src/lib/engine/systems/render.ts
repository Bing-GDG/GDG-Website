import type { Transform3d } from "../components/general";
import type { ThreeObject } from "../components/graphics";
import type { System, World } from "../mecs";

class RenderSystem implements System {
    tick(world: World, dt: number): void {
        for (const [entity, o, t] of world.view<[ThreeObject, Transform3d]>("ThreeObject")) {
            o.mesh.position.copy(t.position);
            o.mesh.rotation.setFromVector3(t.rotation);
            o.mesh.scale.copy(t.scale);
        }
    }
}
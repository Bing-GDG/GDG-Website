import * as THREE from "three";
import type { Transform3d } from "../components/general";
import type { ThreeCamera, ThreeObject } from "../components/graphics";
import type { System, World } from "../mecs";

export class RenderSystem implements System {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene = new THREE.Scene();

    constructor(world: World, canvas: HTMLCanvasElement) {
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

        // things only render when parented to a scene
        world.onAttach<ThreeObject>("ThreeObject", (entity, o) => this.scene.add(o.mesh));
        world.onDetach<ThreeObject>("ThreeObject", (entity, o) => this.scene.remove(o.mesh));
    }

    tick(world: World, dt: number): void {
        for (const [entity, o, t] of world.view<[ThreeObject, Transform3d]>("ThreeObject", "Transform3d")) {
            o.mesh.position.copy(t.position);
            o.mesh.rotation.setFromVector3(t.rotation);
            o.mesh.scale.copy(t.scale);
        }

        // camera
        const cameras = world.view<[ThreeCamera, Transform3d]>("ThreeCamera", "Transform3d");
        if (cameras.length === 0) return;

        const [entity, c, t] = cameras[0];
        c.camera.position.copy(t.position);
        c.camera.rotation.setFromVector3(t.rotation);

        this.resize(c.camera);
        this.renderer.render(this.scene, c.camera);
    }

    // keep the drawing buffer matched to the canvas display size
    private resize(camera: THREE.PerspectiveCamera) {
        const canvas = this.renderer.domElement;
        const width = Math.floor(canvas.clientWidth * window.devicePixelRatio);
        const height = Math.floor(canvas.clientHeight * window.devicePixelRatio);

        if (canvas.width !== width || canvas.height !== height) {
            this.renderer.setSize(width, height, false);
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
    }
}

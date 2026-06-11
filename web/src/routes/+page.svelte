<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { World } from "$lib/engine/mecs";
    import { RenderSystem } from "$lib/engine/systems/render";
    import { CameraControlSystem } from "$lib/engine/systems/camera";
    import type { Transform3d } from "$lib/engine/components/general";
    import type { ThreeCamera, ThreeObject } from "$lib/engine/components/graphics";

    let canvas: HTMLCanvasElement;

    onMount(() => {
        const world = new World();

        world.registerSystem(new CameraControlSystem());
        world.registerSystem(new RenderSystem(world, canvas));

        // test cubes
        const logo = new THREE.TextureLoader().load("/assets/gdg-logo.png");
        logo.colorSpace = THREE.SRGBColorSpace;

        const gdgCube = world.entity();
        world.attach<Transform3d>(gdgCube, "Transform3d", {
            position: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Vector3(0, 0, 0),
            scale: new THREE.Vector3(1, 1, 1),
        });
        world.attach<ThreeObject>(gdgCube, "ThreeObject", {
            mesh: new THREE.Mesh(
                new THREE.BoxGeometry(),
                new THREE.MeshBasicMaterial({ map: logo })
            ),
        });

        const normalCube = world.entity();
        world.attach<Transform3d>(normalCube, "Transform3d", {
            position: new THREE.Vector3(2, 0, 0),
            rotation: new THREE.Vector3(0, 0, 0),
            scale: new THREE.Vector3(1, 1, 1),
        });
        world.attach<ThreeObject>(normalCube, "ThreeObject", {
            mesh: new THREE.Mesh(
                new THREE.BoxGeometry(),
                new THREE.MeshNormalMaterial()
            ),
        });

        // camera
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.rotation.order = "YXZ";

        const cam = world.entity();
        world.attach<Transform3d>(cam, "Transform3d", {
            position: new THREE.Vector3(0, 0, 5),
            rotation: new THREE.Vector3(0, 0, 0),
            scale: new THREE.Vector3(1, 1, 1),
        });
        world.attach<ThreeCamera>(cam, "ThreeCamera", { camera });

        let last = performance.now();
        let frame = requestAnimationFrame(function loop(now) {
            world.tick((now - last) / 1000);
            last = now;
            frame = requestAnimationFrame(loop);
        });

        return () => cancelAnimationFrame(frame);
    });
</script>

<canvas bind:this={canvas} class="block h-screen w-screen"></canvas>

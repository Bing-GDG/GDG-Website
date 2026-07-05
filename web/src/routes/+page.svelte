<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { World } from "$lib/engine/mecs";
    import { PhysicsSystem } from "$lib/engine/systems/physics";
    import { RenderSystem } from "$lib/engine/systems/render";
    import { CameraControlSystem } from "$lib/engine/systems/camera";
    import type { Transform3d } from "$lib/engine/components/general";
    import type { ThreeCamera, ThreeObject } from "$lib/engine/components/graphics";
    import type { RigidBody } from "$lib/engine/components/physics";

    let canvas: HTMLCanvasElement;

    onMount(() => {
        const world = new World();

        const physics = new PhysicsSystem(world);
        world.registerSystem(physics);
        world.registerSystem(new CameraControlSystem());
        world.registerSystem(new RenderSystem(world, canvas));

        const logo = new THREE.TextureLoader().load("/assets/gdg-logo.png");
        logo.colorSpace = THREE.SRGBColorSpace;

        // do a quick physics sim for now
        const floor = world.entity();
        world.attach<Transform3d>(floor, "Transform3d", {
            position: new THREE.Vector3(0, -2, 0),
            rotation: new THREE.Quaternion(),
            scale: new THREE.Vector3(20, 0.5, 20),
        });
        world.attach<ThreeObject>(floor, "ThreeObject", {
            mesh: new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial()),
        });
        world.attach<RigidBody>(floor, "RigidBody", {
            type: "fixed",
            shape: { kind: "cuboid", hx: 10, hy: 0.25, hz: 10 },
        });

        // falling cubes
        for (let i = 0; i < 8; i++) {
            const cube = world.entity();
            const x = (Math.random() - 0.5) * 3;
            const z = (Math.random() - 0.5) * 3;

            world.attach<Transform3d>(cube, "Transform3d", {
                position: new THREE.Vector3(x, 3 + i * 1.2, z),
                rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(i * 0.5, i * 0.3, 0)),
                scale: new THREE.Vector3(1, 1, 1),
            });
            world.attach<ThreeObject>(cube, "ThreeObject", {
                mesh: new THREE.Mesh(
                    new THREE.BoxGeometry(),
                    i % 2 === 0 ? new THREE.MeshBasicMaterial({ map: logo }) : new THREE.MeshNormalMaterial()
                ),
            });
            world.attach<RigidBody>(cube, "RigidBody", {
                type: "dynamic",
                shape: { kind: "cuboid", hx: 0.5, hy: 0.5, hz: 0.5 },
                restitution: 0.3,
            });
        }

        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

        const cam = world.entity();
        world.attach<Transform3d>(cam, "Transform3d", {
            position: new THREE.Vector3(0, 2, 12),
            rotation: new THREE.Quaternion(),
            scale: new THREE.Vector3(1, 1, 1),
        });
        world.attach<ThreeCamera>(cam, "ThreeCamera", { camera });

        // TODO! probably handle the loop somewhere else internally and expose it
        let last = performance.now();
        let frame = requestAnimationFrame(function loop(now) {
            world.tick((now - last) / 1000);
            last = now;
            frame = requestAnimationFrame(loop);
        });

        return () => {
            cancelAnimationFrame(frame);
            physics.dispose();
        };
    });
</script>

<canvas bind:this={canvas} class="block h-screen w-screen"></canvas>

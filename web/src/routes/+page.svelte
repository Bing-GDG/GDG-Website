<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { World } from "$lib/engine/mecs";
    import { PhysicsSystem } from "$lib/engine/systems/physics";
    import { RenderSystem } from "$lib/engine/systems/render";
    import { CameraSystem } from "$lib/engine/systems/camera";
    import { Transform3d } from "$lib/engine/components/general";
    import { ThreeCamera, ThreeObject } from "$lib/engine/components/graphics";
    import { RigidBody } from "$lib/engine/components/physics";
    import { MainPlayer } from "$lib/engine/components/player";
    import { MovementSystem } from "$lib/engine/systems/movement";

    let canvas: HTMLCanvasElement;

    onMount(() => {
        const world = new World();

        const physics = new PhysicsSystem();
        world.registerSystem(physics);
        world.registerSystem(new RenderSystem(canvas));

        world.registerSystem(new CameraSystem());
        world.registerSystem(new MovementSystem());

        const logo = new THREE.TextureLoader().load("/assets/gdg-logo.png");
        logo.colorSpace = THREE.SRGBColorSpace;

        // do a quick physics sim for now
        const floor = world.entity();
        world.attach(floor, Transform3d, new Transform3d({
            position: new THREE.Vector3(0, -2, 0),
            rotation: new THREE.Quaternion(),
            localScale: new THREE.Vector3(20, 0.5, 20),
        }));
        world.attach(floor, ThreeObject, {
            mesh: new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial()),
        });
        world.attach(floor, RigidBody, {
            type: "fixed",
            shape: { kind: "cuboid", hx: 0.5, hy: 0.5, hz: 0.5 },
        });

        // falling cubes
        for (let i = 0; i < 32; i++) {
            const cube = world.entity();
            const x = (Math.random() - 0.5) * 3;
            const z = (Math.random() - 0.5) * 3;

            world.attach(cube, Transform3d, new Transform3d({
                position: new THREE.Vector3(x, 3 + i * 1.2, z),
                rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(i * 0.5, i * 0.3, 0)),
                localScale: new THREE.Vector3(8, 8, 1),
            }));
            world.attach(cube, ThreeObject, {
                mesh: new THREE.Mesh(
                    new THREE.BoxGeometry(),
                    i % 2 === 0 ? new THREE.MeshBasicMaterial({ map: logo }) : new THREE.MeshNormalMaterial()
                ),
            });
            world.attach(cube, RigidBody, {
                type: "dynamic",
                shape: { kind: "cuboid", hx: 0.5, hy: 0.5, hz: 0.5 },
                restitution: 0.3,
                gravityScale: (i > 16) ? 1 : 0,
                density: 100,
            });
        }

        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

        // main player creation 
        const player = world.entity();
        world.attach(player, Transform3d, new Transform3d({
            position: new THREE.Vector3(0, 2, 8),
            rotation: new THREE.Quaternion(),
            localScale: new THREE.Vector3(1, 1, 1),
        }));
        world.attach(player, ThreeCamera, { camera });
        world.attach(player, MainPlayer, {
            lookSensitivity: 0.004,
            moveSpeed: 10,
            jumpPower: 8,
        });
        world.attach(player, RigidBody, {
            type: "dynamic",
            shape: { kind: "capsule", radius: 0.5, halfHeight: 1 },
            restitution: 0,
            friction: 2,
            lockRotations: true,
            linearDamping: 0.2,
            angularDamping: 0.85,
            density: 50,
        });

        // TODO! probably handle the loop somewhere else internally and expose it
        let last = performance.now();
        let frame = requestAnimationFrame(function loop(now) {
            world.tick((now - last) / 1000);
            last = now;
            frame = requestAnimationFrame(loop);
            world.input.lock("Locked");
        });

        return () => {
            cancelAnimationFrame(frame);
            physics.dispose();
        };
    });
</script>

<canvas bind:this={canvas} class="block h-screen w-screen"></canvas>

<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";

    const PARALLAX = 0.3;
    const FOLLOW_LENGTH = 0.9;

    let pattern = $state<HTMLElement | null>(null);

    onMount(() => {
        if (!pattern || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const el = pattern;

        const tile = parseFloat(getComputedStyle(el).backgroundSize);
        const position = { offset: window.scrollY * PARALLAX };
        const render = () => {
            const wrapped = ((position.offset % tile) + tile) % tile;
            el.style.transform = `translate3d(0, ${-wrapped}px, 0)`;
        };
        const follow = gsap.quickTo(position, "offset", { duration: FOLLOW_LENGTH, ease: "power3.out", onUpdate: render });
        render();

        const onScroll = () => follow(window.scrollY * PARALLAX);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            follow.tween.kill();
        };
    });
</script>

<!-- fixed to the screen and behind the stuff -->
<div class="backdrop" aria-hidden="true">
    <div class="bg-grid pattern" bind:this={pattern}></div>
</div>

<style>
    .backdrop {
        position: fixed;
        inset: 0;
        z-index: -1;
        overflow: hidden;
        pointer-events: none;
        mask-image: linear-gradient(to bottom, #000, transparent 95%);
    }
    .pattern {
        position: absolute;
        inset: 0 0 calc(-1 * var(--grid-tile)) 0;
        will-change: transform;
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import Lettering from "./Lettering.svelte";

    // thank you claude.

    // onreveal runs when the two halves start to part, so the page can start its own entrance then.
    const { text, onreveal }: { text: string; onreveal?: () => void } = $props();

    // Timings in seconds, measured frame by frame from the title animation this sequence copies.
    // There the title pulses between dim and full brightness. It never blinks off between pulses.
    const LEAD_IN = 0.05;
    // The first fade-in starts from black and the last fade-out ends in black, so both run longer.
    const FIRST_FADE_IN_LENGTH = 0.18;
    const FADE_IN_LENGTH = 0.13;
    const FADE_OUT_LENGTH = 0.13;
    const LAST_FADE_OUT_LENGTH = 0.18;
    // How long the title holds at full and at dim before it turns around.
    const PEAK_HOLD = 0.03;
    const DIM_HOLD = 0.02;
    // The opacity the title dims to between pulses.
    const DIM_OPACITY = 0.33;
    const PULSES = 3;
    // At the peak of the last pulse the logo brightens and the lettering turns a paler lime.
    const LAST_PULSE_LOGO_FILTER = "brightness(1.4)";
    const LAST_PULSE_TEXT_COLOR = "#dae8ab";
    // The title rises at constant speed from shortly after the last fade-in starts until it has faded out.
    // The rise ends only when the title is gone, so it is never seen to stop.
    const RISE_DELAY = 0.08;
    // Rise speed as a fraction of the viewport height per second.
    const RISE_SPEED = 0.124;
    const SPLIT_LENGTH = 1;

    let done = $state(false);
    let root = $state<HTMLElement | null>(null);
    let topHalf = $state<HTMLElement | null>(null);
    let bottomHalf = $state<HTMLElement | null>(null);
    let title = $state<HTMLElement | null>(null);
    let reflection = $state<HTMLElement | null>(null);

    onMount(() => {
        if (!root) return;

        // The stylesheet hides the overlay for reduced motion, and the CSS failsafe hides it
        // when this script starts late. In both cases the page is already visible, so do not play.
        const style = getComputedStyle(root);
        if (style.display === "none" || style.visibility === "hidden") {
            done = true;
            return;
        }
        // The timeline controls the overlay from here, so the failsafe must not fire during it.
        root.style.animation = "none";

        const lockups = [title, reflection];
        const logos = root.querySelectorAll(".intro-logo");
        const timeline = gsap.timeline({
            onComplete: () => {
                done = true;
            },
        });

        // A fade-in slows as it reaches full and a fade-out starts slowly, as in the reference.
        let at = LEAD_IN;
        for (let pulse = 0; pulse < PULSES; pulse++) {
            const isLast = pulse === PULSES - 1;
            const fadeIn = pulse === 0 ? FIRST_FADE_IN_LENGTH : FADE_IN_LENGTH;
            timeline.to(lockups, { opacity: 1, duration: fadeIn, ease: "sine.out" }, at);

            if (isLast) {
                // The reflection sits in a vertically flipped box, so the same upward move sends it downward.
                const riseLength = fadeIn - RISE_DELAY + LAST_FADE_OUT_LENGTH;
                timeline.to(lockups, { y: -window.innerHeight * RISE_SPEED * riseLength, duration: riseLength, ease: "none" }, at + RISE_DELAY);
                at += fadeIn;
                // The logo is an image, so the color set on the lockups changes only the lettering.
                timeline.set(logos, { filter: LAST_PULSE_LOGO_FILTER }, at);
                timeline.set(lockups, { color: LAST_PULSE_TEXT_COLOR }, at);
                timeline.to(lockups, { opacity: 0, duration: LAST_FADE_OUT_LENGTH, ease: "sine.in" }, at);
                at += LAST_FADE_OUT_LENGTH;
            } else {
                at += fadeIn + PEAK_HOLD;
                timeline.to(lockups, { opacity: DIM_OPACITY, duration: FADE_OUT_LENGTH, ease: "sine.in" }, at);
                at += FADE_OUT_LENGTH + DIM_HOLD;
            }
        }

        // The halves part only once the title has faded out completely, so the screen is plain black when it splits.
        timeline.call(() => onreveal?.(), undefined, at);
        timeline.to(topHalf, { xPercent: -100, duration: SPLIT_LENGTH, ease: "expo.out" }, at);
        timeline.to(bottomHalf, { xPercent: 100, duration: SPLIT_LENGTH, ease: "expo.out" }, at);

        return () => timeline.kill();
    });
</script>

{#snippet lockup()}
    <!-- The page shows this before any script runs, so the browser starts loading it with the HTML. -->
    <img class="intro-logo" src="/assets/gdg-logo.png" alt="" fetchpriority="high" />
    <Lettering {text} />
{/snippet}

{#if !done}
    <div class="intro" bind:this={root} aria-hidden="true">
        <div class="half half-top" bind:this={topHalf}></div>
        <div class="half half-bottom" bind:this={bottomHalf}></div>

        <!-- The title is drawn over the halves and is not inside them, so the split never moves it. -->
        <div class="anchor anchor-title">
            <div class="lockup" bind:this={title}>{@render lockup()}</div>
        </div>
        <div class="anchor anchor-reflection">
            <div class="lockup" bind:this={reflection}>{@render lockup()}</div>
        </div>
    </div>
{/if}

<style>
    .intro {
        /* The lettering on one line is about 20 letter heights wide, so 4vw keeps the line near 80% of the screen width. */
        --glyph-h: clamp(16px, min(4vw, 4.6vh), 44px);
        /* Distance from the lettering to the line where the screen splits. */
        --seam-gap: calc(var(--glyph-h) * 0.4);
        position: fixed;
        inset: 0;
        z-index: 1000;
        /* The title must not show past the screen edge while it rises on short screens. */
        overflow: hidden;
        /* Reveals the page if the script that plays the sequence never runs. */
        animation: intro-failsafe 0.3s linear 5s forwards;
    }
    /* Hidden from 99% on, because Chrome can finish an animation a rounding error short of 100%,
       and visibility only switches to hidden at the exact end of a keyframe interval. */
    @keyframes intro-failsafe {
        99%,
        to {
            opacity: 0;
            visibility: hidden;
        }
    }
    @media (prefers-reduced-motion: reduce) {
        .intro {
            display: none;
        }
    }

    .half {
        position: absolute;
        left: 0;
        right: 0;
        background: #000;
        will-change: transform;
    }
    .half-top {
        top: 0;
        /* One pixel of overlap so no line of the page shows between the halves on odd viewport heights. */
        height: calc(50% + 1px);
    }
    .half-bottom {
        top: 50%;
        bottom: 0;
    }

    .anchor {
        position: absolute;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
    }
    .anchor-title {
        bottom: calc(50% + var(--seam-gap));
    }
    /* The same lockup flipped below the split line, as a reflection that fades with distance from the line. */
    .anchor-reflection {
        top: calc(50% + var(--seam-gap));
        transform: scaleY(-1);
        mask-image: linear-gradient(to top, rgb(0 0 0 / 0.4), transparent 42%);
    }

    .lockup {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(var(--glyph-h) * 1.2);
        color: var(--primary);
        opacity: 0;
    }
    .intro-logo {
        height: calc(var(--glyph-h) * 3.8);
        width: auto;
    }

    /* Below this width one line would make the letters too small to read, so the words stack and grow. */
    @media (max-width: 560px) {
        .intro {
            --glyph-h: clamp(16px, min(6.2vw, 3vh), 36px);
        }
        .lockup :global(.lettering) {
            flex-direction: column;
        }
    }
</style>

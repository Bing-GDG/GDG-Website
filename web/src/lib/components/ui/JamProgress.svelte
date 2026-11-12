<script lang="ts">
    import { Progress } from "./progress";
    import Timer from "./Timer.svelte";
    import { now } from "$lib/clock";
    import { formatTime } from "$lib/format";

    const { start, end, timeZone }: { start: Date; end: Date; timeZone: string } = $props();

    const time = $derived(now());
    const phase = $derived(time < start ? "upcoming" : time < end ? "running" : "ended");
    const donePercent = $derived(
        100 * Math.min(1, Math.max(0, (time.getTime() - start.getTime()) / (end.getTime() - start.getTime())))
    );
</script>

<section class="panel p-5 sm:p-7" aria-labelledby="jam-progress-title">
    <div class="flex md:flex-row flex-col md:items-end justify-between gap-5">
        <div>
            <p class="">Game Jam</p>
            <h2 id="jam-progress-title" class="mt-3 text-3xl sm:text-4xl font-bold uppercase leading-none">
                {#if phase === "upcoming"}
                    Starts In
                {:else if phase === "running"}
                    Ends In
                {:else}
                    This Game Jam has ended!
                {/if}
            </h2>
        </div>
        {#if phase !== "ended"}
            <Timer target={phase === "upcoming" ? start : end} class="text-4xl sm:text-5xl text-primary" />
        {/if}
    </div>

    <div class="relative mt-12">
        <!-- The slime stands on the bar at the current position. The clamp keeps it inside the panel at both ends. -->
        <Progress class="h-4 rounded-none bg-foreground/10 bar-segments [--segments:28] sm:[--segments:48] lg:[--segments:64]" value={donePercent} aria-label="Game jam progress" />
    </div>
    <div class="mt-3 flex items-center justify-between label-mono text-muted-foreground">
        <span>{formatTime(start, timeZone, true)}</span>
        <span class="text-primary">{Math.floor(donePercent)}%</span>
        <span>{formatTime(end, timeZone, true)}</span>
    </div>
</section>

<style>
    /* Two-frame idle hop, stepped like a sprite animation. */
    .slime {
        animation: slime-hop 0.9s steps(1) infinite;
    }
    @keyframes slime-hop {
        50% {
            translate: 0 -3px;
        }
    }
    @media (prefers-reduced-motion: reduce) {
        .slime {
            animation: none;
        }
    }
</style>

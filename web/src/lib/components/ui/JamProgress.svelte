<script lang="ts">
    import { Card } from "./card";
    import { Progress } from "./progress";
    import Timer from "./Timer.svelte";
    import { now } from "$lib/clock";
    import { formatTime } from "$lib/format";

    // start and end bound the whole jam. The bar fills between them, and the countdown targets whichever comes next.
    const { start, end, timeZone }: { start: Date; end: Date; timeZone: string } = $props();

    const time = $derived(now());
    const phase = $derived(time < start ? "upcoming" : time < end ? "running" : "ended");
    const doneFraction = $derived(
        Math.min(1, Math.max(0, (time.getTime() - start.getTime()) / (end.getTime() - start.getTime())))
    );
</script>

<Card class="border border-foreground/75 p-6 gap-0">
    <div class="flex md:flex-row flex-col md:items-end justify-between gap-2">
        <h2 class="text-3xl sm:text-4xl font-bold">
            {#if phase === "upcoming"}
                Starts In
            {:else if phase === "running"}
                Time Remaining
            {:else}
                This Game Jam has ended!
            {/if}
        </h2>
        {#if phase !== "ended"}
            <Timer target={phase === "upcoming" ? start : end} class="justify-start text-3xl sm:text-4xl font-bold" />
        {/if}
    </div>
    <Progress class="h-6 mt-4 border border-muted-foreground bg-transparent rounded-sm" value={doneFraction * 100} aria-label="Game jam progress" />
    <div class="flex flex-row items-center text-lg sm:text-xl brightness-75 italic mt-1">
        <p>{formatTime(start, timeZone, true)}</p>
        <p class="ml-auto">{formatTime(end, timeZone, true)}</p>
    </div>
</Card>

<script lang="ts">
    import { now } from "$lib/clock";
    import { cn } from "$lib/utils";

    const { target, class: className = "" }: { target: Date, class?: string } = $props();

    const SECOND_MS = 1000;
    const MINUTE_MS = 60 * SECOND_MS;
    const HOUR_MS = 60 * MINUTE_MS;
    const DAY_MS = 24 * HOUR_MS;

    // Clamped so the countdown stops at zero instead of counting negative after the target passes.
    let timeLeft = $derived(Math.max(0, target.getTime() - now().getTime()));

    let units = $derived([
        { label: "days", value: Math.floor(timeLeft / DAY_MS) },
        { label: "hrs", value: Math.floor((timeLeft % DAY_MS) / HOUR_MS) },
        { label: "min", value: Math.floor((timeLeft % HOUR_MS) / MINUTE_MS) },
        { label: "sec", value: Math.floor((timeLeft % MINUTE_MS) / SECOND_MS) },
    ]);

    function pad(num: number, padding: number = 2): string {
        return num.toString().padStart(padding, "0");
    }
</script>

<div class={cn("flex items-start gap-[0.2em] font-bold leading-none", className)} role="timer">
    {#each units as unit, i}
        {#if i > 0}
            <span class="text-muted-foreground/50" aria-hidden="true">:</span>
        {/if}
        <div class="flex flex-col items-center gap-2">
            <span class="flex">
                <!-- Each digit gets a fixed-width cell so the countdown does not shift as it ticks. -->
                {#each [...pad(unit.value)] as digit}
                    <span class="inline-block w-[0.66em] text-center">{digit}</span>
                {/each}
            </span>
            <span class="label-mono text-muted-foreground">{unit.label}</span>
        </div>
    {/each}
</div>

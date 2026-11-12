<script lang="ts">
    import type { Event } from "./types";
    import { Progress } from "./progress";
    import { now } from "$lib/clock";
    import { dayKey, formatDay, formatTime } from "$lib/format";

    // timeZone sets which calendar day each event falls on and the times shown, so every visitor sees venue times.
    const { events, timeZone }: { events: Event[]; timeZone: string } = $props();

    const sorted = $derived(events.toSorted((a, b) => a.start.getTime() - b.start.getTime()));

    // Events grouped by calendar day, in start order.
    const days: Event[][] = $derived.by(() => {
        const grouped: Event[][] = [];
        let currentKey: string | null = null;
        for (const event of sorted) {
            const key = dayKey(event.start, timeZone);
            if (key !== currentKey) {
                currentKey = key;
                grouped.push([]);
            }
            grouped[grouped.length - 1].push(event);
        }
        return grouped;
    });

    const time = $derived(now());
    const todayKey = $derived(dayKey(time, timeZone));

    // Events with an end time that are in progress.
    const activeEvents = $derived(
        sorted.filter((event): event is Event & { end: Date } =>
            event.end !== undefined && time >= event.start && time < event.end
        )
    );

    // The first event that has not started yet.
    const nextEvent = $derived(sorted.find((event) => event.start > time));

    // An event without an end time is a single moment, so it counts as past once it starts.
    function isPast(event: Event): boolean {
        return time >= (event.end ?? event.start);
    }
</script>

<!-- progress bars for active events -->
{#if activeEvents.length > 0}
    <section class="panel mb-4 border-primary/60 p-5" aria-labelledby="schedule-now">
        <h3 id="schedule-now" class="label-mono flex items-center gap-2 text-primary">
            <span class="size-2 bg-primary animate-pulse"></span>
            Happening Now
        </h3>
        {#each activeEvents as event}
            {@const donePercent = 100 * (time.getTime() - event.start.getTime()) / (event.end.getTime() - event.start.getTime())}
            <div class="mt-4">
                <div class="flex flex-wrap items-baseline gap-x-3">
                    <p class="text-2xl font-bold uppercase">{event.title}</p>
                    {#if event.loc}
                        <p class="text-muted-foreground">@ {event.loc}</p>
                    {/if}
                </div>
                <Progress class="mt-3 h-3 rounded-none bg-foreground/10 bar-segments [--segments:28] sm:[--segments:48] lg:[--segments:64]" value={donePercent} aria-label="{event.title} progress" />
                <div class="mt-3 flex items-center justify-between label-mono text-muted-foreground">
                    <span>{formatTime(event.start, timeZone, true)}</span>
                    <span>{formatTime(event.end, timeZone, true)}</span>
                </div>
            </div>
        {/each}
    </section>
{/if}

<div class="panel grid md:grid-flow-col md:auto-cols-fr">
    {#each days as day, i}
        {@const isToday = dayKey(day[0].start, timeZone) === todayKey}
        <section class={i === 0 ? "" : "border-t md:border-t-0 md:border-l border-border"}>
            <header class="border-b border-border px-4 pt-4 pb-3 sm:px-5">
                <p class="label-mono flex h-5 items-center gap-2 text-muted-foreground">
                    Day {i + 1}
                    {#if isToday}
                        <span class="bg-primary px-1.5 py-1 text-primary-foreground">Today</span>
                    {/if}
                </p>
                <h3 class="mt-1 text-2xl font-bold uppercase leading-none {isToday ? 'text-primary' : ''}">{formatDay(day[0].start, timeZone)}</h3>
            </header>
            <ol class="px-4 sm:px-5">
                {#each day as event}
                    {@const isNext = event === nextEvent}
                    <li class="grid grid-cols-[4.25rem_1fr] gap-x-3 border-b border-border/60 py-3 last:border-b-0 transition-opacity {isPast(event) ? 'opacity-40' : ''}">
                        <time datetime={event.start.toISOString()} class="pt-0.5 font-mono text-sm {isNext ? 'text-primary' : 'text-muted-foreground'}">{formatTime(event.start, timeZone)}</time>
                        <div>
                            <p class="font-semibold leading-snug {isNext ? 'text-primary' : ''}">
                                {isNext ? '<' : ''}{event.title}{isNext ? '>' : ''}
                            </p>
                            {#if event.loc || event.end}
                                <p class="mt-0.5 text-sm text-muted-foreground">
                                    {#if event.loc}@ {event.loc}{/if}{#if event.loc && event.end}{" · "}{/if}{#if event.end}until {formatTime(event.end, timeZone)}{/if}
                                </p>
                            {/if}
                            {#if event.desc}
                                <p class="mt-1 text-sm text-muted-foreground/80">{event.desc}</p>
                            {/if}
                        </div>
                    </li>
                {/each}
            </ol>
        </section>
    {/each}
</div>

<script lang="ts">
    import { Card } from "./card";
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

    // An event without an end time is a single moment, so it counts as past once it starts.
    function isPast(event: Event): boolean {
        return time >= (event.end ?? event.start);
    }
</script>

<!-- progress bars for active events -->
{#if activeEvents.length > 0}
    <section class="flex flex-col gap-6 mb-4" aria-labelledby="schedule-now">
        <h3 id="schedule-now" class="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Happening Now</h3>
        {#each activeEvents as event}
            {@const doneFraction = (time.getTime() - event.start.getTime()) / (event.end.getTime() - event.start.getTime())}
            <div>
                <div class="flex md:flex-row flex-col md:items-center">
                    <p class="text-3xl font-semibold">{event.title}</p>
                    {#if event.loc}
                        <p class="text-xl brightness-75 italic md:ml-2">@ {event.loc}</p>
                    {/if}
                </div>
                <Progress class="h-5 mt-2 border border-muted-foreground bg-transparent rounded-sm" value={doneFraction * 100} aria-label="{event.title} progress" />
                <div class="flex flex-row items-center text-xl brightness-75 italic mt-1">
                    <p>{formatTime(event.start, timeZone, true)}</p>
                    <p class="ml-auto">{formatTime(event.end, timeZone, true)}</p>
                </div>
            </div>
        {/each}
    </section>
{/if}

<Card class="border border-foreground/75 flex md:flex-row flex-col justify-between py-0 gap-0">
    {#each days as day, i}
        {@const isToday = dayKey(day[0].start, timeZone) === todayKey}
        <div class="flex-1 px-4 py-4 {i === 0 ? '' : 'border-t md:border-t-0 md:border-l border-foreground/75'}">
            <h3 class="mb-2">
                <span class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em]">
                    <span class="opacity-75">Day {i + 1}</span>
                    {#if isToday}
                        <!-- leading-none keeps the badge as tall as the label so the date lines up across columns -->
                        <span class="rounded-full bg-primary px-2 py-0.5 leading-none tracking-wider text-primary-foreground">Today</span>
                    {/if}
                </span>
                <span class="block text-2xl font-bold {isToday ? 'text-primary' : ''}">{formatDay(day[0].start, timeZone)}</span>
            </h3>
            {#each day as event}
                <div class="mb-3 transition-opacity {isPast(event) ? 'opacity-50' : ''}">
                    <p class="text-lg">{event.title}</p>
                    <p class="text-sm text-foreground/75">
                        {formatTime(event.start, timeZone)}{#if event.end}&nbsp;– {formatTime(event.end, timeZone)}{/if}
                        {#if event.loc}
                            @ {event.loc}
                        {/if}
                    </p>
                    {#if event.desc}
                        <p class="mt-1 text-sm text-foreground/60">{event.desc}</p>
                    {/if}
                </div>
            {/each}
        </div>
    {/each}
</Card>

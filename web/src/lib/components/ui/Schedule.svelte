<script lang="ts">
    import { onMount } from "svelte";
    import { Card } from "./card";
import type { Event } from "./types";
    import { Progress } from "./progress";

    const { events }: { events: Event[] } = $props();

    // sorted by days
    let days: Event[][] = $derived.by(() => {
        const sorted = events.toSorted((a, b) => a.start.getTime() - b.start.getTime());

        const grouped: Event[][] = [];
        let currentDay: Date | null = null;
        for (const event of sorted) {
            if (!currentDay || event.start.toDateString() !== currentDay.toDateString()) {
                currentDay = event.start;
                grouped.push([]);
            }
            grouped[grouped.length - 1].push(event);
        }
        return grouped;
    });

    // the time updating
    let now = $state(new Date());
    onMount(() => {
        const id = setInterval(() => {
            now = new Date();
        }, 1000 * 0.1); // update every 0.1s do not underestimate modern computing power 

        return () => clearInterval(id);
    });

    function isSameDay(a: Date, b: Date) {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    }

    let activeDayIndex = $derived.by(() => {
        return days.findIndex((day) => isSameDay(day[0].start, now));
    });

    // if theres no explicit end time, use latest timestamp across all events
    let implicitEnd: Date = $derived(new Date(Math.max(
        ...events.map(e => Math.max(e.start.getTime(), e.end?.getTime() ?? 0))
    )));

    // events that are currently ongoing
    let activeEvents: Event[] = $derived.by(() => {
        const sorted = events.toSorted((a, b) => a.start.getTime() - b.start.getTime());
        return sorted.filter((event) => {
            const eventEnd = event.end ?? implicitEnd;
            return now >= event.start && now < eventEnd;
        });
    });

    // util
    function formatTime(d: Date) {
        const isOnHour = d.getMinutes() === 0;

        return d.toLocaleTimeString([], {
            hour: "numeric",
            ...(isOnHour ? {} : { minute: "2-digit" })
        });
    }
</script>

<!-- progress bars for active events -->

<div class="flex flex-col mb-4">
    <p class="text-5xl font-bold text-center">Happening NOW</p>
    {#each activeEvents as event}
        {@const donePercent = (now.getTime() - event.start.getTime()) / ((event.end?.getTime() ?? implicitEnd.getTime()) - event.start.getTime())}
        <div>
            <p class="text-3xl">{event.title}</p>
            <Progress class="h-5" value={donePercent * 100}></Progress>
        </div>
    {/each}
</div>

<Card class="border border-foreground/75 flex md:flex-row flex-col justify-between">
    {#each days as day, i}
        <div class="flex flex-col flex-1">
            <div class="h-full {i === 0 ? '' : 'md:border-l border-foreground/75'} px-4 py-2">
                <div class="{i !== activeDayIndex ? 'brightness-70' : ''}">
                    <h2 class="text-2xl font-bold mb-2">{day[0].start.toLocaleDateString([], {
                        weekday: "short",
                        month: "short",
                        day: "numeric"
                    })}</h2>
                    {#each day as event}
                        <div class="mb-2">
                            <p>{event.title}</p>
                            {#if event.loc && event.loc !== ""}
                                <p class="text-sm text-foreground/75">
                                    {formatTime(event.start)}
                                    {event.end ? `- ${formatTime(event.end)}` : ""}
                                    {(event.loc && event.loc !== "") ? ` @ ${event.loc}` : ""}
                                </p>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/each}
</Card>
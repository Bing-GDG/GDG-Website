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
            if (event.phantom) continue;

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

    // events that are currently ongoing
    let activeEvents: Event[] = $derived.by(() => {
        const sorted = events.toSorted((a, b) => a.start.getTime() - b.start.getTime());
        return sorted.filter((event) => {
            const eventEnd = event.end;
            if (!eventEnd) return false; // its an 'instant' or marker type event
            return now >= event.start && now < eventEnd;
        });
    });

    // util
    function formatTime(d: Date, includeDate: boolean = false): string {
        const isOnHour = d.getMinutes() === 0;

        return d.toLocaleTimeString([], {
            hour: "numeric",
            ...(isOnHour ? {} : { minute: "2-digit" }),
            ...(includeDate ? { month: "short", day: "numeric" } : {})
        });
    }
</script>

<!-- progress bars for active events -->

{#if activeEvents.length > 0}

<div class="flex flex-col mb-4">
    <p class="text-5xl font-bold text-center"></p>
    {#each activeEvents as event}
        {@const donePercent = (now.getTime() - event.start.getTime()) / ((event.end!.getTime()) - event.start.getTime())}
        <div>
            <div class="flex md:flex-row flex-col md:items-center ">
                <p class="text-3xl font-semibold">{event.title}</p>
                {#if event.loc} 
                    <p class="text-xl brightness-75 italic ml-2">@ {event.loc}</p>
                {/if}
            </div>
            <Progress class="h-5 mt-2 border border-muted-foreground bg-transparent rounded-sm" value={donePercent * 100}/>
            <div class="flex flex-row items-center text-xl brightness-75 italic mt-1">
                <p>{formatTime(event.start, true)}</p>
                <p class="ml-auto">{formatTime(event.end!, true)}</p>
            </div>
        </div>
    {/each}
</div>

{/if}

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
                            <p class="text-lg">{event.title}</p>
                            <p class="text-sm text-foreground/75">
                                {formatTime(event.start)}
                                {#if event.end && event.end !== event.start}
                                    - {formatTime(event.end)}
                                {/if}
                                {#if event.loc && event.loc !== ""}
                                    @ {event.loc}
                                {/if}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/each}
</Card>
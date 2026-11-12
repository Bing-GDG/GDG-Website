<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import Card from "$lib/components/ui/card/card.svelte";
    import JamProgress from "$lib/components/ui/JamProgress.svelte";
    import Schedule from "$lib/components/ui/Schedule.svelte";
    import Timer from "$lib/components/ui/Timer.svelte";
    import { now } from "$lib/clock";
    import { formatDayRange } from "$lib/format";
    import gameJamPhoto from "$lib/assets/gameJam5.jpg";
    import {
        GAMEJAM_END,
        GAMEJAM_EVENTS,
        GAMEJAM_LOCATION,
        GAMEJAM_PRIZE_CATEGORIES,
        GAMEJAM_SCHEDULE_NOTES,
        GAMEJAM_START,
        GAMEJAM_TIME_ZONE,
        GAMEJAM_TITLE,
        ITCHIO_URL,
        REGISTER_FORM_URL,
        TEAM_REGISTRATION_FORM_URL,
    } from "$lib/consts";

    // Derived from the jam times so the header cannot disagree with the countdown, e.g. "November 13 – 15".
    const dateRange = formatDayRange(GAMEJAM_START, GAMEJAM_END, GAMEJAM_TIME_ZONE);

    // The links, timer, photo and prize cards are commented out in the markup while the jam runs.
    // Their script stays here so uncommenting the markup restores them.
    const links = [
        { label: "Register", href: REGISTER_FORM_URL },
        { label: "Teams", href: TEAM_REGISTRATION_FORM_URL },
        { label: "itch.io", href: ITCHIO_URL },
    ];

    const phase = $derived(now() < GAMEJAM_START ? "upcoming" : now() < GAMEJAM_END ? "running" : "ended");

    let titleEl = $state<HTMLElement | null>(null);
    let subtitleEl = $state<HTMLElement | null>(null);
    let progressEl = $state<HTMLElement | null>(null);
    let timerCard = $state<HTMLElement | null>(null);
    let linksCard = $state<HTMLElement | null>(null);
    let photoCard = $state<HTMLElement | null>(null);
    let prizesCard = $state<HTMLElement | null>(null);
    let scheduleEl = $state<HTMLElement | null>(null);

    onMount(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        // Elements that are not rendered stay null and are skipped.
        const intro: [HTMLElement | null, gsap.TweenVars][] = [
            [titleEl, { y: -60, duration: 1.1 }],
            [subtitleEl, { y: -60, duration: 1.1, delay: 0.2 }],
            [progressEl, { y: 60, delay: 0.4 }],
            [timerCard, { x: -30, delay: 0.4 }],
            [linksCard, { x: 30, delay: 0.4 }],
            [photoCard, { x: -30, delay: 0.55 }],
            [prizesCard, { x: 30, delay: 0.55 }],
            [scheduleEl, { y: 60, delay: 0.7 }],
        ];

        const tweens = intro.flatMap(([el, vars]) =>
            el ? [gsap.from(el, { opacity: 0, duration: 1.2, ease: "power3.out", ...vars })] : []
        );

        return () => tweens.forEach((tween) => tween.kill());
    });
</script>

<svelte:head>
    <title>{GAMEJAM_TITLE}</title>
    <meta name="description" content="{GAMEJAM_TITLE}, {dateRange} at the {GAMEJAM_LOCATION}. Time remaining and the event schedule." />
</svelte:head>

<main class="bg-background flex flex-col w-full min-h-screen items-center px-[8vw] py-16">
    <div class="w-full max-w-6xl">
        <!-- this is the top section above the timer-->
        <header class="flex flex-col items-center m-4 mb-16">
            <h1 bind:this={titleEl} class="text-center bg-linear-to-r from-[oklch(0.8213_0.0653_225.72)] to-[oklch(0.8413_0.1359_154.61)] text-transparent bg-clip-text inline-block font-inter font-bold text-4xl sm:text-6xl uppercase leading-none">
                {GAMEJAM_TITLE}
            </h1>
            <p bind:this={subtitleEl} class="mt-4 text-center text-base sm:text-xl tracking-[0.3em] uppercase opacity-60">{dateRange} @ {GAMEJAM_LOCATION}</p>
        </header>

        <div bind:this={progressEl}>
            <JamProgress start={GAMEJAM_START} end={GAMEJAM_END} timeZone={GAMEJAM_TIME_ZONE} />
        </div>

        <!-- Hidden while the jam runs so the page shows only the title, jam progress and schedule.
        <div class="flex flex-col gap-layout">
            <div class="flex md:flex-row flex-col gap-layout">
                <Card class="flex-1 items-center justify-center p-6" bind:ref={timerCard}>
                    {#if phase === "upcoming"}
                        <p class="text-2xl sm:text-4xl opacity-75">Starts in...</p>
                        <Timer target={GAMEJAM_START} class="text-center font-bold text-4xl lg:text-6xl" />
                    {:else if phase === "running"}
                        <p class="text-2xl sm:text-4xl opacity-75">Ends in...</p>
                        <Timer target={GAMEJAM_END} class="text-center font-bold text-4xl lg:text-6xl" />
                    {:else}
                        <p class="text-2xl sm:text-4xl opacity-75 text-center">This Game Jam has ended!</p>
                    {/if}
                </Card>
                <Card class="flex-1 flex flex-col justify-around p-6 text-4xl xl:text-6xl font-bold gap-4" bind:ref={linksCard}>
                    {#each links as link, i}
                        <a class="group uppercase opacity-80 hover:opacity-100 focus-visible:opacity-100 transition-opacity {i % 2 === 0 ? 'ml-auto' : ''}" href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label}
                            <span class="inline-block transition-transform group-hover:translate-x-2" aria-hidden="true">>></span>
                        </a>
                    {/each}
                </Card>
            </div>
            <div class="flex md:flex-row flex-col gap-layout md:h-80">
                <Card class="flex-2 relative overflow-hidden p-0 aspect-4/3 md:aspect-auto" bind:ref={photoCard}>
                    <img class="size-full object-cover" src={gameJamPhoto} alt="Participants of Game Jam 5 posing together" decoding="async" />
                </Card>
                <Card class="flex-1 justify-center p-6" bind:ref={prizesCard}>
                    <h2 class="text-4xl font-bold">Prize Categories</h2>
                    <ul>
                        {#each GAMEJAM_PRIZE_CATEGORIES as category}
                            <li class="mt-2 font-medium text-2xl opacity-60">{category}</li>
                        {/each}
                    </ul>
                </Card>
            </div>
        </div>
        -->

        <section class="my-16 flex flex-col gap-y-8" bind:this={scheduleEl}>
            <h2 class="text-4xl sm:text-5xl text-center font-bold">
                Our Schedule
            </h2>
            <div>
                <Schedule events={GAMEJAM_EVENTS} timeZone={GAMEJAM_TIME_ZONE} />
                <ul class="mt-4 flex flex-col gap-1 text-sm text-foreground/75">
                    <li>All times are Eastern Time.</li>
                    {#each GAMEJAM_SCHEDULE_NOTES as note}
                        <li>{note}</li>
                    {/each}
                </ul>
            </div>
        </section>

        <!-- <div class="my-16">
            <h1 class="text-5xl text-center">
                OUR PREVIOUS SUBMISSIONS
            </h1>
            <div class="flex flex-row justify-center items-center">
                rotating stuff
            </div>
        </div> -->
    </div>
</main>

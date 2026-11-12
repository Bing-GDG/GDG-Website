<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import Card from "$lib/components/ui/card/card.svelte";
    import GridBackdrop from "$lib/components/ui/GridBackdrop.svelte";
    import IntroSequence from "$lib/components/ui/IntroSequence.svelte";
    import JamProgress from "$lib/components/ui/JamProgress.svelte";
    import Schedule from "$lib/components/ui/Schedule.svelte";
    import Timer from "$lib/components/ui/Timer.svelte";
    import { now } from "$lib/clock";
    import { formatDayRange } from "$lib/format";
    import gameJamPhoto from "$lib/assets/gameJam5.jpg";
    import {
        GAMEJAM_EDITION,
        GAMEJAM_END,
        GAMEJAM_EVENTS,
        GAMEJAM_LOCATION,
        GAMEJAM_NAME,
        GAMEJAM_PRIZE_CATEGORIES,
        GAMEJAM_SCHEDULE_NOTES,
        GAMEJAM_START,
        GAMEJAM_TIME_ZONE,
        GAMEJAM_TITLE,
        GDG_NAME,
        ITCHIO_URL,
        REGISTER_FORM_URL,
        TEAM_REGISTRATION_FORM_URL,
    } from "$lib/consts";

    const dateRange = formatDayRange(GAMEJAM_START, GAMEJAM_END, GAMEJAM_TIME_ZONE);

    const LABELS = { upcoming: "Approaching...", running: "Happening now", ended: "Ended" };
    const phase = $derived(now() < GAMEJAM_START ? "upcoming" : now() < GAMEJAM_END ? "running" : "ended");

    // TODO! the rrest of the page :laugh:
    const links = [
        { label: "Register", href: REGISTER_FORM_URL },
        { label: "Teams", href: TEAM_REGISTRATION_FORM_URL },
        { label: "itch.io", href: ITCHIO_URL },
    ];

    let statusEl = $state<HTMLElement | null>(null);
    let titleEl = $state<HTMLElement | null>(null);
    let subtitleEl = $state<HTMLElement | null>(null);
    let markEl = $state<HTMLElement | null>(null);
    let progressEl = $state<HTMLElement | null>(null);
    let timerCard = $state<HTMLElement | null>(null);
    let linksCard = $state<HTMLElement | null>(null);
    let photoCard = $state<HTMLElement | null>(null);
    let prizesCard = $state<HTMLElement | null>(null);
    let scheduleEl = $state<HTMLElement | null>(null);

    let entrance: gsap.core.Tween[] = [];

    // the animations that play when the page contents starts to show (after the two rectangle and intro sequence thing)
    function playEntrance() {
        const steps: [HTMLElement | null, gsap.TweenVars, number][] = [
            [statusEl, { x: -40 }, 0],
            [titleEl, { x: -60 }, 0.03],
            [subtitleEl, { x: -40 }, 0.06],
            [markEl, { x: 60 }, 0.06],
            [progressEl, { y: 40 }, 0.1],
            [timerCard, { x: -30 }, 0.14],
            [linksCard, { x: 30 }, 0.14],
            [photoCard, { x: -30 }, 0.18],
            [prizesCard, { x: 30 }, 0.18],
            [scheduleEl, { y: 40 }, 0.16],
        ];

        entrance = steps.flatMap(([el, from, delay]) =>
            el ? [gsap.from(el, { opacity: 0, duration: 1, ease: "expo.out", ...from, delay })] : [] // TODO! maybe sin isnteado f exp
        );
    }

    onMount(() => () => entrance.forEach((tween) => tween.kill()));
</script>

<svelte:head>
    <title>{GAMEJAM_TITLE}</title>
    <meta name="description" content="{GAMEJAM_TITLE}, {dateRange} at the {GAMEJAM_LOCATION}. Time remaining and the event schedule." />
</svelte:head>

<IntroSequence text={GDG_NAME} onreveal={playEntrance} />

<GridBackdrop />

<main class="flex flex-col w-full min-h-screen items-center overflow-x-clip px-[6vw] py-12 sm:py-16">
    <div class="w-full max-w-6xl">
        <!-- this is the top section above the timer-->
        <header class="mb-10 sm:mb-14 flex items-end justify-between gap-8">
            <div>
                <p bind:this={statusEl} class="label-mono inline-flex items-center gap-2 px-2.5 py-2 {phase === 'running' ? 'border-primary text-primary' : 'text-muted-foreground'}">
                    <span class="size-1.5 {phase === 'running' ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}"></span>
                    [{LABELS[phase]}]
                </p>
                <h1 bind:this={titleEl} class="mt-5 text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.9] text-balance">
                    {GAMEJAM_NAME} <span class="text-primary">{GAMEJAM_EDITION}</span>
                </h1>
                <p bind:this={subtitleEl} class="mt-5 font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-muted-foreground">
                    {dateRange} <span class="text-primary">//</span> {GAMEJAM_LOCATION}
                </p>
            </div>
            <div bind:this={markEl} class="hidden md:block shrink-0 text-primary">
                COOL THING HERE?
            </div>
        </header>

        <div bind:this={progressEl}>
            <JamProgress start={GAMEJAM_START} end={GAMEJAM_END} timeZone={GAMEJAM_TIME_ZONE} />
        </div>

        <!-- TODO! rework later
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

        <section class="mt-14 sm:mt-20" bind:this={scheduleEl}>
            <div class="mb-5 flex items-end justify-between gap-4">
                <h2 class="text-3xl sm:text-5xl font-extrabold uppercase leading-none">Schedule</h2>
            </div>
            <Schedule events={GAMEJAM_EVENTS} timeZone={GAMEJAM_TIME_ZONE} />
            <ul class="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
                {#each GAMEJAM_SCHEDULE_NOTES as note}
                    <li class="flex gap-2"><span class="font-mono text-primary" aria-hidden="true">*</span>{note}</li>
                {/each}
            </ul>
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

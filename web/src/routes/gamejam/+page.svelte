<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import Card from "$lib/components/ui/card/card.svelte";
    import Schedule from "$lib/components/ui/Schedule.svelte";
    import Timer from "$lib/components/ui/Timer.svelte";
    import { GAMEJAM_EVENTS, ITCHIO_URL, REGISTER_FORM_URL, TEAM_RESIGRATION_FORM_URL, TIMER_TARGET } from "$lib/consts";

    // TODO! most of this will be reworked later
    let titleEl: HTMLElement;
    let titleHeaderEl: HTMLElement;

    let leftBox1 = $state<HTMLElement | null>(null);
    let leftBox2 = $state<HTMLElement | null>(null);

    let rightBox1 = $state<HTMLElement | null>(null);
    let rightBox2 = $state<HTMLElement | null>(null);

    let schedule: HTMLElement;

    onMount(() => {
        // holy slop
        gsap.from(titleEl, {
            y: -60,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
        });

        gsap.from(titleHeaderEl, {
            y: -60,
            opacity: 0,
            duration: 1.1,
            delay: 0.2,
            ease: "power3.out",
        });

        gsap.from(leftBox1, {
            x: -30,
            opacity: 0,
            duration: 1.2,
            delay: 0.4,
            ease: "power3.out",
        });

        gsap.from(leftBox2, {
            x: -30,
            opacity: 0,
            duration: 1.2,
            delay: 0.55,
            ease: "power3.out",
        });

        gsap.from(rightBox1, {
            x: 30,
            opacity: 0,
            duration: 1.2,
            delay: 0.4,
            ease: "power3.out",
        });

        gsap.from(rightBox2, {
            x: 30,
            opacity: 0,
            duration: 1.2,
            delay: 0.55,
            ease: "power3.out",
        });


        gsap.from(schedule, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            delay: 0.7,
            ease: "power3.out",
        });
    });
</script>

<div class="bg-background flex flex-col w-screen min-h-screen items-center px-[8vw] py-16">
    <div class="w-full max-w-6xl">
        <!-- this is the top section above the timer-->
        <div class="flex flex-col items-center m-4 mb-16">
            <h1 bind:this={titleEl} class="text-center bg-linear-to-r from-[oklch(0.8213_0.0653_225.72)] to-[oklch(0.8413_0.1359_154.61)] text-transparent bg-clip-text inline-block font-inter font-bold text-6xl uppercase leading-none">
                Binghamton Game Jam 6
            </h1>
            <p bind:this={titleHeaderEl} class="mt-4 text-xl tracking-[0.3em] uppercase opacity-60">April 10 – 12 @ Innovation Lab</p>
        </div>

        <!-- the block with the timer and google form -->
        <div class="flex flex-col gap-layout">
            <div class="flex md:flex-row flex-col gap-layout">
                <Card class="flex-1 items-center justify-center p-6" bind:ref={leftBox1}>
                    <p class="text-3xl opacity-75">Starts in...</p>
                    <Timer target={TIMER_TARGET} class="text-center font-bold text-6xl" />
                </Card>
                <Card class="flex-1 flex flex-col justify-around p-6 text-6xl font-bold gap-4" bind:ref={rightBox1}>
                    <a class="ml-auto items-center opacity-80 hover:opacity-100 transition-opacity" href={REGISTER_FORM_URL} target="_blank" rel="noopener noreferrer">
                        REGISTER
                        <span class="transition-transform group-hover:translate-x-2">>></span>
                    </a>
                    <a class="items-center opacity-80 hover:opacity-100 transition-opacity" href={TEAM_RESIGRATION_FORM_URL} target="_blank" rel="noopener noreferrer">
                        TEAMS
                        <span class="transition-transform group-hover:translate-x-2">>></span>
                    </a>
                    <a class="ml-auto items-center opacity-80 hover:opacity-100 transition-opacity" href={ITCHIO_URL} target="_blank" rel="noopener noreferrer">
                        ITCHIO
                        <span class="transition-transform group-hover:translate-x-2">>></span>
                    </a>
                </Card>
            </div>
            <div class="flex md:flex-row flex-col gap-layout">
                <Card class="flex-2 h-60 relative overflow-hidden" bind:ref={leftBox2}>
                    <img class="object-cover" src="..\src\lib\assets\gameJam5.jpg" alt="group picture of participants of game jam 5">
                </Card>
                <Card class="flex-1 justify-center p-6" bind:ref={rightBox2}>
                    <p class="text-4xl font-bold">Prize Categories</p>
                    <p class="mt-2 font-medium text-2xl opacity-60">Art & Design</p>
                    <p class="mt-2 font-medium text-2xl opacity-60">Gameplay & Feel</p>
                    <p class="mt-2 font-medium text-2xl opacity-60">Creativity & Innovation</p>
                </Card>
            </div>
        </div>
        <!-- <h1 class="text-5xl text-center">
            REGISTER
        </h1>
        <div class="bg-black max-h-150 overflow-scroll border border-foreground/75 rounded-lg my-16">
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeZyN-aS0yIXLK14hsVUUeYtptEpYLX3WdbpGGVQR3_X-FaJg/viewform?embedded=true" class="w-full" height="1000" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div> -->

        <div class="my-16 flex flex-col gap-y-8" bind:this={schedule}>
            <h1 class="text-5xl text-center font-bold">
                Our Schedule
            </h1>
            <!-- schedule block -->
            <Schedule events={GAMEJAM_EVENTS} />
        </div>

        <!-- <div class="my-16">
            <h1 class="text-5xl text-center">
                OUR PREVIOUS SUBMISSIONS
            </h1>
            <div class="flex flex-row justify-center items-center">
                rotating stuff
            </div>
        </div> -->
    </div>
</div>

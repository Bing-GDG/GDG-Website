<script lang="ts">
    import Card from "$lib/components/ui/card/card.svelte";
    import Schedule from "$lib/components/ui/Schedule.svelte";
    import { GAMEJAM_EVENTS } from "$lib/consts";

    let someVar: number = $state(4);

    function add(a: number, b: number): number {
        return a + b;
    }
</script>

<div class="bg-background flex flex-col w-screen h-screen items-center justify-center px-[8vw]">
    <div class="bg-red-300 w-full h-full">
        <!-- this is the top section above the timer-->
        <div class="flex flex-row justify-center items-center m-4 mb-16">
            <h1 class="text-foreground font-inter font-bold text-[6vw]">
                Binghjamton Game Jam
            </h1>
        </div>

        <!-- the block with the timer and google form -->
        <div class="flex flex-col gap-layout">
            <div class="flex flex-row gap-layout">
                <div class="flex flex-col gap-layout flex-1">
                    <Card class="text-4xl">
                        TIMER
                    </Card> 
                    <Card class="text-6xl">
                        REGISTER NOW.
                    </Card> 
                    <div class="flex flex-row gap-layout">
                        <Card class="flex-1">
                            thing
                        </Card>
                        <Card class="flex-1">
                            thing
                        </Card>
                        <Card class="flex-1">
                            thing
                        </Card>
                    </div>
                </div>
                <Card class="text-6xl flex-1">
                    GOOGLE FORM
                </Card>
            </div>
            <div class="flex flex-row gap-layout">
                <Card class="flex-2 h-60">
                    IMAGE
                </Card>
                <Card class="flex-1 pl-4">
                    <p class="text-4xl">3 Prize Categories</p>
                    <p class="text-2xl">blah</p>
                    <p class="text-2xl">blah</p>
                    <p class="text-2xl">blah</p>
                </Card>
            </div>
        </div>
        <div class="my-16">
            <h1 class="text-5xl text-center"> 
                OUR PREVIOUS SUBMISSIONS
            </h1>
            <div class="flex flex-row justify-center items-center">
                <!-- rotating thingies -->

            </div>
        </div>
        <div>
            <!-- schedule block -->
            <Schedule events={GAMEJAM_EVENTS} />
        </div>

        <h1 class="text-5xl text-center"> 
            REGISTER
        </h1>
        <div class="max-h-200 overflow-scroll border border-foreground/75 rounded-lg my-16">
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeZyN-aS0yIXLK14hsVUUeYtptEpYLX3WdbpGGVQR3_X-FaJg/viewform?embedded=true" class="w-full" height="1000" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div>
    </div>
</div>
<script lang="ts">
    import Card from "$lib/components/ui/card/card.svelte";
    import Schedule from "$lib/components/ui/Schedule.svelte";
    import Timer from "$lib/components/ui/Timer.svelte";
    import { GAMEJAM_EVENTS, TIMER_TARGET } from "$lib/consts";

    let someVar: number = $state(4);

    function add(a: number, b: number): number {
        return a + b;
    }

    // user: how do i make the carasoul of previous game submissions?
    // claude opus 4.6: you can use a library like "svelte-carousel" or create a custom carousel component using Svelte's reactive features. Here's a simple example of how to create a basic carousel for previous game submissions:       
    /*
    ```typescript

    ```
    */
</script>

<div class="bg-background flex flex-col w-screen h-screen items-center justify-center px-[8vw]">
    <div class="w-full h-full">
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
                        <Timer target={TIMER_TARGET} class="text-center font-bold text-6xl" />
                    </Card> 
                    <Card class="text-6xl">
                        REGISTER NOW.
                    </Card> 
                </div>
                <Card class="text-6xl flex-1 flex flex-col justify-around p-4">
                    <a class="ml-auto" href="https://itch.io/jam/gdg-game-jam-6" target="_blank" rel="noopener noreferrer">
                        ITCHIO
                    </a>
                    <a class="ml-auto" href="https://docs.google.com/forms/d/1ALromMlqgjrIubssrG1lZFDZkR4tqsSsjqsDqNCz4K0" target="_blank" rel="noopener noreferrer">
                        TEAMS
                    </a>
                    <a class="ml-auto" href="" target="_blank" rel="noopener noreferrer">
                        REGISTER
                    </a>
                </Card>
            </div>
            <div class="flex flex-row gap-layout">
                <Card class="flex-2 h-60">
                    IMAGE
                </Card>
                <Card class="flex-1 pl-4">
                    <p class="text-4xl">3 Prize Categories</p>
                    <p class="text-2xl"></p>
                    <p class="text-2xl">blah</p>
                    <p class="text-2xl">blah</p>
                </Card>
            </div>
        </div>
        <h1 class="text-5xl text-center"> 
            REGISTER
        </h1>
        <div class="bg-black max-h-150 overflow-scroll border border-foreground/75 rounded-lg my-16">
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeZyN-aS0yIXLK14hsVUUeYtptEpYLX3WdbpGGVQR3_X-FaJg/viewform?embedded=true" class="w-full" height="1000" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div>
        
        <div>
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
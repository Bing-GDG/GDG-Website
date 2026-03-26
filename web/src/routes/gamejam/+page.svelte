<script lang="ts">
    import Card from "$lib/components/ui/card/card.svelte";

    let someVar: number = $state(4);

    function add(a: number, b: number): number {
        return a + b;
    }
</script>

<div class="bg-background flex flex-col w-screen h-screen items-center justify-center px-[8vw]">
    <div class="bg-red-300 w-full h-full">
        <!-- this is the top section above the timer-->
        <div class="flex flex-row">
            <h1 class="text-foreground font-inter font-bold text-5xl">
                Binghjamtom Game Jam
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
    </div>
</div>
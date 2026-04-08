<script lang="ts">
    import { onMount } from "svelte";

    const { target, class: className = "" }: { target: Date, class?: string } = $props();

    let now = $state(new Date());
    onMount(() => {
        const id = setInterval(() => {
            now = new Date();
        }, 1000 * 0.1); 

        return () => clearInterval(id);
    });

    // milis
    let timeLeft = $derived(target.getTime() - now.getTime());

    function pad(num: number, padding: number = 2): string {
        return num.toString().padStart(padding, "0");
    }

    let days = $derived(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
    let hours = $derived(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = $derived(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = $derived(Math.floor((timeLeft % (1000 * 60)) / 1000));
</script>

<div class={className}>
    {pad(days)}:{pad(hours)}:{pad(minutes)}:{pad(seconds)}
</div>
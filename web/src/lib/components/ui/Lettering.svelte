<script lang="ts" module>
    // the thinly written text
    const GLYPHS: Record<string, string> = {
        A: "M0 6V1.5L1.5 0H2.5L4 1.5V6M0 3.75H4",
        D: "M0 0H3L4 1V5L3 6H0Z",
        E: "M4 0H0V6H4M0 3H3",
        G: "M4 0H1L0 1V5L1 6H4V3H2",
        L: "M0 0V6H4",
        M: "M0 6V0L2 2L4 0V6",
        N: "M0 6V0L4 4M4 0V6",
        O: "M1 0H3L4 1V5L3 6H1L0 5V1Z",
        P: "M0 6V0H3L4 1V2L3 3H0",
        R: "M0 6V0H3L4 1V2L3 3H0M1 3L4 6",
        T: "M0 0H4M2 0V6",
        U: "M0 0V5L1 6H3L4 5V0",
        V: "M0 0V4L2 6L4 4V0",
    };
    const GLYPH_WIDTH = 4;
    const GLYPH_HEIGHT = 6;
    const LETTER_GAP = 2.5;
    // Room around each word so strokes on the edge of the grid are not clipped.
    const PAD = 0.5;
</script>

<script lang="ts">
    // Each word is its own SVG so the words can wrap or stack. --glyph-h on any ancestor sets the letter height.
    const { text }: { text: string } = $props();

    const words = $derived(text.toUpperCase().split(/\s+/).filter(Boolean));

    function wordWidth(word: string): number {
        return word.length * GLYPH_WIDTH + (word.length - 1) * LETTER_GAP;
    }
</script>

<span class="lettering" aria-hidden="true">
    {#each words as word}
        <svg viewBox="{-PAD} {-PAD} {wordWidth(word) + 2 * PAD} {GLYPH_HEIGHT + 2 * PAD}" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square" stroke-linejoin="miter">
            {#each [...word] as letter, i}
                <!-- non-scaling-stroke keeps the lines one hairline wide at every size -->
                <path d={GLYPHS[letter]} transform="translate({i * (GLYPH_WIDTH + LETTER_GAP)} 0)" vector-effect="non-scaling-stroke" />
            {/each}
        </svg>
    {/each}
</span>

<style>
    .lettering {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: calc(var(--glyph-h, 1em) * 0.75) calc(var(--glyph-h, 1em) * 1.1);
    }
    svg {
        height: var(--glyph-h, 1em);
        width: auto;
        overflow: visible;
    }
</style>

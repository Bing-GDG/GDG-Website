import { createSubscriber } from "svelte/reactivity";

const TICK_MS = 1000;

let current = new Date();
let running = false;

// One timer serves every component that reads now(). It runs only while at least one
// component reads now() inside an effect, and it stops when the last such component unmounts.
const subscribe = createSubscriber((update) => {
    let timeout: ReturnType<typeof setTimeout>;

    // Wait until the next whole second so countdown digits change in step with the system clock.
    const schedule = () => {
        timeout = setTimeout(tick, TICK_MS - (Date.now() % TICK_MS));
    };
    const tick = () => {
        current = new Date();
        update();
        schedule();
    };

    current = new Date();
    running = true;
    schedule();

    return () => {
        running = false;
        clearTimeout(timeout);
    };
});

/**
 * Returns the current time. Components that read it re-render on every whole second.
 * Reads outside an effect, including server rendering, return a fresh Date.
 */
export function now(): Date {
    subscribe();
    return running ? current : new Date();
}

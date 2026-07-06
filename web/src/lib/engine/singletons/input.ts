import { Vector2 } from "three";

/// Cursor lock modes, mirrors unitys CursorLockMode.
export type LockState = "None" | "Locked";

/// Global input singleton that kinda mirrors unitys input api
export class Input {
    private static _instance: Input | null = null;

    public static get instance(): Input {
        return this._instance ??= new Input();
    }

    // keys currently held down
    private held: Set<string> = new Set();
    // keys that went down/up since the last flush
    private pressed: Set<string> = new Set();
    private released: Set<string> = new Set();

    // same thing mouse buttons (0 left, 1 middle, 2 right)
    private mouseHeld: Set<number> = new Set();
    private mousePressed: Set<number> = new Set();
    private mouseReleased: Set<number> = new Set();

    private _mousePosition: Vector2 = new Vector2();
    private _mouseDelta: Vector2 = new Vector2();

    private constructor() {
        if (typeof window === "undefined") return;

        window.addEventListener("keydown", (e) => {
            if (!e.repeat) this.pressed.add(e.key);
            this.held.add(e.key);
        });

        window.addEventListener("keyup", (e) => {
            this.held.delete(e.key);
            this.released.add(e.key);
        });

        window.addEventListener("mousedown", (e) => {
            this.mousePressed.add(e.button);
            this.mouseHeld.add(e.button);
        });

        window.addEventListener("mouseup", (e) => {
            this.mouseHeld.delete(e.button);
            this.mouseReleased.add(e.button);
        });

        window.addEventListener("mousemove", (e) => {
            this._mousePosition.set(e.clientX, e.clientY);
            this._mouseDelta.x += e.movementX;
            this._mouseDelta.y += e.movementY;
        });
    }

    /// True only on the tick the key went down
    public keyDown(key: string): boolean {
        return this.pressed.has(key);
    }

    /// True while the key is held
    public keyPress(key: string): boolean {
        return this.held.has(key);
    }

    /// True only on the tick the key went up
    public keyUp(key: string): boolean {
        return this.released.has(key);
    }

    /// True only on the tick the button went down
    public mouseDown(button: number = 0): boolean {
        return this.mousePressed.has(button);
    }

    /// True while the button is held
    public mousePress(button: number = 0): boolean {
        return this.mouseHeld.has(button);
    }

    /// True only on the tick the button went up
    public mouseUp(button: number = 0): boolean {
        return this.mouseReleased.has(button);
    }

    /// Mouse position in client space
    public get mousePosition(): Vector2 {
        return this._mousePosition.clone();
    }

    /// Mouse movement since the last tick
    public get mouseDelta(): Vector2 {
        return this._mouseDelta.clone();
    }

    /// Lock the cursor
    public lock(state: LockState) {
        if (typeof document === "undefined") return;

        if (state !== "Locked") {
            document.exitPointerLock();
            return;
        }

        const req = document.body.requestPointerLock() as unknown;
        if (req instanceof Promise) req.catch(() => {});
    }

    /// World calls this at the end of every tick
    public flush() {
        this.pressed.clear();
        this.released.clear();
        this.mousePressed.clear();
        this.mouseReleased.clear();
        this._mouseDelta.set(0, 0);
    }
}

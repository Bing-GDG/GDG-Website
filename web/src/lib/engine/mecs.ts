// mini ecs implementation im so createive

import { Input } from "./singletons/input";

type Entity = number;

type ComponentStore = Record<string, any>;

export interface System {
    init(world: World): any;
    tick(world: World, dt: number): void;
}

export class CallbackHandle {
    private _ur: () => void;

    public constructor(unregister: () => void) {
        this._ur = unregister;
    }

    public unregister() {
        this._ur();
    }
}

/// basically a big system orchestrator 
// TODO! prevent funny memory leak
export class World {
    private entities: Map<Entity, ComponentStore> = new Map();
    private callbacks: { 
        oa: Record<string, Record<number, (entity: Entity, component: any) => any>>,
        od: Record<string, Record<number, (entity: Entity, component: any) => any>>
    } = { oa: {}, od: {} };

    private uniqueCounter: number = 0;

    // look up an entity by a component name
    private entityLookup: Map<string, Set<Entity>> = new Map();

    private systems: System[] = [];

    private _time: number = 0;
    private _timescale: number = 1;
    // the world clamps the timestep so we don't have insane mega dts 
    // if the tab freezes or loses focus or smth.
    // INDEPENDENT OF TIMESCALE! timescale will continue to scale it up, even 
    // if the dt itself is clamped. 
    private maxTimestep: number;

    constructor(maxTimestep: number = 1/30) {
        this.maxTimestep = maxTimestep;
    }

    /// Global input singleton, see singletons/input.ts
    public get input(): Input {
        return Input.instance;
    }

    /// Total elapsed time in milliseconds since the world started ticking
    public get time(): number {
        return this._time;
    }

    /// Scales the movement of time for the world
    public get timescale(): number {
        return this._timescale;
    }

    public set timescale(value: number) {
        this._timescale = Math.max(0, value);
    }

    public registerSystem(system: System) {
        system.init(this);
        this.systems.push(system);
    }

    /// dt is always clamped to the `maxTimestep` given in the constructor to
    /// prevent accidental instability. 
    public tick(dt: number) {
        const scaled = Math.min(dt, this.maxTimestep) * this._timescale;
        this._time += scaled * 1000;

        for (const system of this.systems) {
            system.tick(this, scaled);
        }
        
        this.input.flush();
    }

    /* ecs impls */

    // I HATE TYPESCRIPT
    // despite having a type system theres nothing useful i can do with it here?
    // i guess man
    /// Order of components in the variadic type array must match the order of the component names
    /// provided in the arguments.
    public view<T extends unknown[]>(...names: string[]): [Entity, ...T][] {
        // TODO!
        if (names.length === 0) return [];

        const intersection = names
            .map(name => this.entityLookup.get(name) ?? new Set<Entity>())
            .reduce((accum, set) => accum.intersection(set));

        return Array.from(intersection).map(entity => {
            const store = this.entities.get(entity)!;
            return [entity, ...names.map(name => store[name])] as [Entity, ...T];
        });
    }
    
    // I HATE TYPESCRIPT
    public attach<T>(entity: Entity, name: string, component: T) {
        let store = this.entities.get(entity) 
        ?? this.entities.set(entity, {}).get(entity)!;
        
        store[name] = component;

        if (!this.entityLookup.has(name)) 
            this.entityLookup.set(name, new Set());

        this.entityLookup.get(name)!.add(entity);

        for (const f of Object.values(this.callbacks.oa[name] ?? {}))
            f(entity, component)
    }
    
    // I HATE TYPESCRIPT
    public detach<T>(entity: Entity, name: string) {
        let store = this.entities.get(entity) 
            ?? this.entities.set(entity, {}).get(entity)!;

        for (const f of Object.values(this.callbacks.od[name] ?? {}))
            f(entity, store[name])

        if (store[name]) delete store[name];

        if (this.entityLookup.has(name)) 
            this.entityLookup.get(name)!.delete(entity);
    }

    public onAttach<T>(name: string, callback: (entity: Entity, component: T) => any): CallbackHandle {
        const i = ++this.uniqueCounter;

        (this.callbacks.oa[name] ??= {})[i] = callback;

        return new CallbackHandle(() => {
           if (this.callbacks.oa[name][i]) delete this.callbacks.oa[name][i]; 
        });
    }

    public onDetach<T>(name: string, callback: (entity: Entity, component: T) => any): CallbackHandle {
        const i = ++this.uniqueCounter;

        (this.callbacks.od[name] ??= {})[i] = callback;

        return new CallbackHandle(() => {
           if (this.callbacks.od[name][i]) delete this.callbacks.od[name][i]; 
        });
    }

    /// Create a new entity
    public entity(): Entity {
        return ++this.uniqueCounter;
    }
}
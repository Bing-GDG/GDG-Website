// mini ecs implementation im so createive

import { Input } from "./singletons/input";

type Entity = number;

type ComponentStore = Record<string, any>;

export interface System {
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

    /// Global input singleton, see singletons/input.ts
    public get input(): Input {
        return Input.instance;
    }

    public registerSystem(system: System) {
        this.systems.push(system);
    }

    public tick(dt: number) {
        for (const system of this.systems) {
            system.tick(this, dt);
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
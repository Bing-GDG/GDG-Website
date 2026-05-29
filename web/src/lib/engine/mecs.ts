// mini ecs implementation im so createive

type Entity = number;

type ComponentStore = Record<string, any>;

export interface System {
    tick(world: World, dt: number): void;
}

/// basically a big system orchestrator 
// TODO! prevent funny memory leak
export class World {
    private entities: Map<Entity, ComponentStore> = new Map();
    private entityId: Entity = 0;

    // look up an entity by a component name
    private entityLookup: Map<string, Set<Entity>> = new Map();

    private systems: System[] = [];

    public registerSystem(system: System) {
        this.systems.push(system);
    }

    public tick(dt: number) {
        for (const system of this.systems) {
            system.tick(this, dt);
        }
    }

    /* ecs impls */

    // I HATE TYPESCRIPT
    // despite having a type system theres nothing useful i can do with it here?
    // i guess man
    /// Order of components in the variadic type array must match the order of the component names
    /// provided in the arguments.
    public view<T extends unknown[]>(...names: string[]): [Entity, ...T][] {
        // TODO!

        const intersection = names.reduce(
            (accum, name) => 
                accum.intersection(this.entityLookup.get(name) ?? new Set()), 
            new Set() as Set<Entity>
        );

        return Array.from(intersection).map(entity => {
            const store = this.entities.get(entity)!;
            return [entity, ...names.map(name => store[name])] as [Entity, ...T];
        });
    }
    
    // I HATE TYPESCRIPT
    public attach(entity: Entity, name: string, component: any) {
        let store = this.entities.get(entity) 
        ?? this.entities.set(entity, {}).get(entity)!;
        
        store[name] = component;

        if (!this.entityLookup.has(name)) 
            this.entityLookup.set(name, new Set());

        this.entityLookup.get(name)!.add(entity);
    }
    
    // I HATE TYPESCRIPT
    public detach(entity: Entity, name: string, component: any) {
        let store = this.entities.get(entity) 
            ?? this.entities.set(entity, {}).get(entity)!;

        if (store[name]) delete store[name];

        if (this.entityLookup.has(name)) 
            this.entityLookup.get(name)!.delete(entity);
    }

    /// Create a new entity
    public entity(): Entity {
        return ++this.entityId;
    }
}
// the type magic that lets us do shit like world.view(Type1, Type2...). 

declare const stored: unique symbol;

export type ComponentId<T> = string & { readonly [stored]: T };

export type Component<T> = ComponentId<T> | { readonly id: ComponentId<T> };

export type Stored<C> =
    C extends ComponentId<infer T> ? T
    : C extends { readonly id: ComponentId<infer T> } ? T
    : never;

export type StoredAll<C extends readonly Component<any>[]> = { [I in keyof C]: Stored<C[I]> };

export function component<T>(name: string): ComponentId<T> {
    return name as ComponentId<T>;
}

export function idOf(c: Component<any>): string {
    return typeof c === "string" ? c : c.id;
}

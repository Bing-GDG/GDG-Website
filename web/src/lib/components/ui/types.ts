export type Event = {
    start: Date,
    end?: Date,
    title: string,
    desc: string,
    loc: string
}

export type ItchGame = {
    id: number,
    url: string
}
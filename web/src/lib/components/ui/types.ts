export type Event = {
    start: Date,
    end?: Date,
    title: string,
    desc?: string,
    loc?: string,
    // the evnet isnt displayed on the schedule but it is still displayed in the active events section
    phantom?: boolean,
}

export type ItchGame = {
    id: number,
    url: string
}
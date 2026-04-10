import type { Event, ItchGame } from "./components/ui/types";

const JAN = 0;
const FEB = 1;
const MAR = 2;
const APR = 3;
const MAY = 4;
const JUN = 5;
const JUL = 6;
const AUG = 7;
const SEP = 8;
const OCT = 9;
const NOV = 10;
const DEC = 11;

export const GAMEJAM_EVENTS: Event[] = [
    // Thursday 4/9
    {
        start: new Date(2026, APR, 9, 13, 0),
        end: new Date(2026, APR, 9, 19, 0),
        title: "TEST EVENT",
        desc: "",
        loc: "UU103"
    },
    {
        start: new Date(2026, APR, 9, 18, 0),
        title: "Game Jam Mixer",
        desc: "",
        loc: "UU103"
    },

    // Friday 4/10
    {
        start: new Date(2026, APR, 10, 19, 30),
        title: "Time Until Submission",
        phantom: true
    },

    {
        start: new Date(2026, APR, 10, 17, 0),
        end: new Date(2026, APR, 10, 18, 0),
        title: "Unity Multiplayer Workshop",
        desc: "Host: Joseph",
        loc: "Innovation Lab"
    },
    {
        start: new Date(2026, APR, 10, 18, 0),
        title: "Dinner",
        desc: "Please fill out the Meal Check-In Form when grabbing food.",
        loc: "Jazzman's Room"
    },
    {
        start: new Date(2026, APR, 10, 18, 30),
        title: "Check-In",
        desc: "",
        loc: "Innovation Lab"
    },
    {
        start: new Date(2026, APR, 10, 19, 0),
        title: "Opening Ceremony",
        desc: "The theme is announced here..",
        loc: "Innovation Lab"
    },
    {
        start: new Date(2026, APR, 10, 19, 30),
        title: "Team Formation",
        desc: "Individuals looking for teams are paired based on project interests",
        loc: "Innovation Lab"
    },
    {
        start: new Date(2026, APR, 10, 19, 30),
        end: new Date(2026, APR, 10, 20, 0),
        title: "GitHub Workshop",
        desc: "Host: Kevin",
        loc: "Innovation Lab"
    },
    {
        start: new Date(2026, APR, 10, 23, 0),
        title: "Rooms Close",
        desc: "",
        loc: "Innovation Lab"
    },

    // Saturday 4/11
    {
        start: new Date(2026, APR, 11, 8, 0),
        title: "Rooms Open",
        desc: "",
        loc: "Innovation Lab"
    },
    {
        start: new Date(2026, APR, 11, 10, 0),
        title: "Breakfast",
        desc: "Please fill out the Meal Check-In Form when grabbing food.",
        loc: "Jazzman's Room"
    },
    {
        start: new Date(2026, APR, 11, 14, 0),
        title: "Lunch",
        desc: "Please fill out the Meal Check-In Form when grabbing food.",
        loc: "Jazzman's Room"
    },
    {
        start: new Date(2026, APR, 11, 18, 0),
        title: "Dinner Is Served",
        desc: "Please fill out the Meal Check-In Form when grabbing food.",
        loc: "Jazzman's Room"
    },
    {
        start: new Date(2026, APR, 11, 23, 0),
        title: "Rooms Close",
        desc: "",
        loc: "Innovation Lab"
    },

    // Sunday 4/12
    {
        start: new Date(2026, APR, 12, 8, 0),
        title: "Rooms Open",
        desc: "",
        loc: "Innovation Lab"
    },
    {
        start: new Date(2026, APR, 12, 10, 0),
        title: "Breakfast Is Served",
        desc: "Please fill out the Meal Check-In Form when grabbing food.",
        loc: "Jazzman's Room"
    },
    {
        start: new Date(2026, APR, 12, 14, 0),
        title: "Lunch Is Served",
        desc: "Please fill out the Meal Check-In Form when grabbing food.",
        loc: "Jazzman's Room"
    },
    {
        start: new Date(2026, APR, 12, 19, 0),
        end: new Date(2026, APR, 12, 19, 0),
        title: "Submissions Close",
        desc: "",
        loc: "Innovation Lab"
    },
    {
        start: new Date(2026, APR, 12, 19, 0),
        title: "Dinner",
        desc: "Please fill out the Meal Check-In Form when grabbing food.",
        loc: "Jazzman's Room"
    },
    {
        start: new Date(2026, APR, 12, 19, 30),
        end: new Date(2026, APR, 12, 21, 0),
        title: "Closing Ceremony",
        desc: "Participant Presentations, Judging, and Awards",
        loc: "Innovation Lab"
    }
];

export const FEATURED_GAMES: ItchGame[] = [
    {
        id: 2364408,
        url: "https://patcavestudio.itch.io/the-meaning-of-life"
    }
]

export const TIMER_TARGET = new Date(2026, APR, 10, 19, 0);

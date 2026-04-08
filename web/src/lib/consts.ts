import type { Event } from "./components/ui/types";

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
    // test
    {
        start: new Date(2026, APR, 7, 0, 0),
        end: new Date(2026, APR, 7, 1, 0),
        title: "Test Event 2",
        desc: "",
        loc: "UU103"
    },
    {
        start: new Date(2026, APR, 7, 23, 32),
        end: new Date(2026, APR, 7, 23, 39),
        title: "Test Event 3",
        desc: "",
        loc: "UU103"
    },

    // Thursday 4/9
    {
        start: new Date(2026, APR, 9, 18, 0),
        title: "Game Jam Mixer",
        desc: "",
        loc: "UU103"
    },

    // Friday 4/10
    {
        start: new Date(2026, APR, 10, 17, 0),
        title: "Multiplayer In Unity Workshop",
        desc: "",
        loc: "LN1120"
    },
    {
        start: new Date(2026, APR, 10, 18, 0),
        title: "Dinner",
        desc: "",
        loc: ""
    },
    {
        start: new Date(2026, APR, 10, 19, 0),
        title: "Opening Ceremony",
        desc: "",
        loc: ""
    },
    {
        start: new Date(2026, APR, 10, 20, 0),
        title: "Git Workshop",
        desc: "",
        loc: ""
    },
    {
        start: new Date(2026, APR, 10, 23, 0),
        title: "Innovation Lab Closes",
        desc: "",
        loc: ""
    },

    // Saturday 4/11
    {
        start: new Date(2026, APR, 11, 8, 0),
        title: "Innovation Lab Opens",
        desc: "",
        loc: ""
    },
    {
        start: new Date(2026, APR, 11, 10, 0),
        title: "Breakfast",
        desc: "",
        loc: ""
    },
    {
        start: new Date(2026, APR, 11, 14, 0),
        title: "Lunch",
        desc: "",
        loc: ""
    },
    {
        start: new Date(2026, APR, 11, 18, 0),
        title: "Dinner",
        desc: "",
        loc: ""
    },
    {
        start: new Date(2026, APR, 11, 23, 0),
        title: "Innovation Lab Closes",
        desc: "",
        loc: ""
    },

    // Sunday 4/12
    {
        start: new Date(2026, APR, 12, 8, 0),
        title: "Innovation Lab Opens",
        desc: "",
        loc: ""
    },
    {
        start: new Date(2026, APR, 12, 10, 0),
        title: "Breakfast",
        desc: "",
        loc: ""
    },
    {
        start: new Date(2026, APR, 12, 14, 0),
        title: "Lunch",
        desc: "",
        loc: ""
    },
    {
        start: new Date(2026, APR, 12, 18, 0),
        title: "Dinner",
        desc: "",
        loc: ""
    },
    {
        start: new Date(2026, APR, 12, 20, 0),
        title: "Submissions Close",
        desc: "",
        loc: ""
    },
    {
        start: new Date(2026, APR, 12, 20, 30),
        title: "Closing Ceremony",
        desc: "",
        loc: ""
    }
];
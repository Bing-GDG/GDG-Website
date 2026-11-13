import { parseDateTime } from "@internationalized/date";
import type { Event, ItchGame } from "./components/ui/types";

export const GDG_NAME = "Game Development Group";

export const FEATURED_GAMES: ItchGame[] = [
    {
        id: 2364408,
        url: "https://patcavestudio.itch.io/the-meaning-of-life"
    }
]

/* gamejam information */
// ts aint changing bro
export const GAMEJAM_TIME_ZONE = "America/New_York";

function jamTime(localDateTime: string): Date {
    return parseDateTime(localDateTime).toDate(GAMEJAM_TIME_ZONE);
}

export const GAMEJAM_NAME = "Binghamton Game Jam";
export const GAMEJAM_EDITION = 7;
export const GAMEJAM_TITLE = `${GAMEJAM_NAME} ${GAMEJAM_EDITION}`;
export const GAMEJAM_LOCATION = "Innovation Lab";

// The jam starts at the theme announcement and ends at the submission deadline.
export const GAMEJAM_START = jamTime("2026-11-13T17:30");
export const GAMEJAM_END = jamTime("2026-11-15T18:00");

export const GAMEJAM_EVENTS: Event[] = [
    // Friday 11/13
    {
        start: jamTime("2026-11-13T17:15"),
        title: "Check-In",
        loc: "Innovation Lab"
    },
    {
        start: GAMEJAM_START,
        title: "Opening Ceremony & Theme Announcement",
        desc: "Afterwards, individuals searching for a team are paired with groups based on project interests, and teams can start working.",
        loc: "Innovation Lab"
    },
    {
        start: jamTime("2026-11-13T18:00"),
        title: "Dinner",
        loc: "Quiet Cup"
    },
    {
        start: jamTime("2026-11-13T23:00"),
        title: "Rooms Close",
        loc: "Innovation Lab"
    },

    // Saturday 11/14
    {
        start: jamTime("2026-11-14T08:00"),
        title: "Rooms Open",
        loc: "Innovation Lab"
    },
    {
        start: jamTime("2026-11-14T10:00"),
        title: "Breakfast",
        loc: "Quiet Cup"
    },
    {
        start: jamTime("2026-11-14T14:00"),
        title: "Lunch",
        loc: "Quiet Cup"
    },
    {
        start: jamTime("2026-11-14T18:00"),
        title: "Dinner",
        loc: "Quiet Cup"
    },
    {
        start: jamTime("2026-11-14T23:00"),
        title: "Rooms Close",
        loc: "Innovation Lab"
    },

    // Sunday 11/15
    {
        start: jamTime("2026-11-15T08:00"),
        title: "Rooms Open",
        loc: "Innovation Lab"
    },
    {
        start: jamTime("2026-11-15T10:00"),
        title: "Breakfast",
        loc: "Quiet Cup"
    },
    {
        start: jamTime("2026-11-15T14:00"),
        title: "Lunch",
        desc: "Catered by Wegmans.",
        loc: "Quiet Cup"
    },
    {
        start: GAMEJAM_END,
        title: "Submissions Due",
        desc: "Submit your game to the itch.io jam page or the Alternate Submission Form."
    },
    {
        start: jamTime("2026-11-15T18:00"),
        title: "Dinner",
        loc: "Quiet Cup"
    },
    {
        start: jamTime("2026-11-15T18:30"),
        end: jamTime("2026-11-15T20:00"),
        title: "Closing Ceremony",
        desc: "Participants present, judges vote and winners are awarded.",
        loc: "Innovation Lab"
    }
];

export const GAMEJAM_SCHEDULE_NOTES = [
    "Please fill out the Meal Check-In Form when grabbing food.",
    "The Quiet Cup is beside the Library North Cafe in the Library Tower, right outside the Innovation Lab."
];

// TODO! update
export const GAMEJAM_PRIZE_CATEGORIES = ["Art & Design", "Gameplay & Feel", "Creativity & Innovation"];

export const ITCHIO_URL = "https://itch.io/jam/gdg-game-jam-6";

export const TEAM_REGISTRATION_FORM_URL = "https://docs.google.com/forms/d/1ALromMlqgjrIubssrG1lZFDZkR4tqsSsjqsDqNCz4K0";

export const REGISTER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeZyN-aS0yIXLK14hsVUUeYtptEpYLX3WdbpGGVQR3_X-FaJg/viewform";

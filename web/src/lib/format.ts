// Pinned so dates render the same on the server and in every browser.
const DISPLAY_LOCALE = "en-US";

/** Formats a time such as "5 PM" or "5:30 PM" in timeZone, with the date ("Nov 13, 5:30 PM") when includeDate is set. */
export function formatTime(d: Date, timeZone: string, includeDate: boolean = false): string {
    // Read the minute in timeZone. The visitor's local minute differs in half-hour offset zones.
    const isOnHour = d.toLocaleString(DISPLAY_LOCALE, { minute: "numeric", timeZone }) === "0";

    return d.toLocaleTimeString(DISPLAY_LOCALE, {
        hour: "numeric",
        ...(isOnHour ? {} : { minute: "2-digit" }),
        ...(includeDate ? { month: "short", day: "numeric" } : {}),
        timeZone
    });
}

/** Formats a calendar day such as "Fri, Nov 13" in timeZone. */
export function formatDay(d: Date, timeZone: string): string {
    return d.toLocaleDateString(DISPLAY_LOCALE, { weekday: "short", month: "short", day: "numeric", timeZone });
}

/** Formats a span of days such as "November 13 – 15" in timeZone. */
export function formatDayRange(start: Date, end: Date, timeZone: string): string {
    return new Intl.DateTimeFormat(DISPLAY_LOCALE, { month: "long", day: "numeric", timeZone }).formatRange(start, end);
}

/** Returns the calendar day in timeZone as YYYY-MM-DD, one comparable key per day. */
export function dayKey(d: Date, timeZone: string): string {
    // The en-CA locale formats dates as YYYY-MM-DD.
    return d.toLocaleDateString("en-CA", { timeZone });
}

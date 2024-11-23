export function formatDate(date: Date | string, locale: string = "en-US", options?: Intl.DateTimeFormatOptions): string {
    let parsed = date as Date;
    if (typeof date === "string") {
        parsed = new Date(date);
    }

    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(parsed);
}
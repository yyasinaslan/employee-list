export function formatDate(date: Date, locale: string = "en-US", options?: Intl.DateTimeFormatOptions): string {
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
}
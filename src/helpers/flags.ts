export function getFlagUrl(locale: string, type: '4x3' | '1x1' = '4x3') {
    return `/flags/${type}/${locale}.svg`;
}
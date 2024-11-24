import {environment} from "../environment/environment.ts";

export function getFlagUrl(locale: string, type: '4x3' | '1x1' = '4x3') {
    return `${environment.baseUrl}/flags/${type}/${locale}.svg`;
}
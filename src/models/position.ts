import {msg} from "@lit/localize";
import {html} from "lit";

export enum Position {
    Junior = 0,
    Medior = 1,
    Senior = 2,
}

export const positionList: { [key in Position]: () => ReturnType<typeof html> } = {
    [Position.Junior]: () => html`${msg('Junior')}`,
    [Position.Medior]: () => html`${msg('Medior')}`,
    [Position.Senior]: () => html`${msg('Senior')}`,
}
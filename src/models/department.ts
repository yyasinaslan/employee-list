import {msg} from "@lit/localize";
import {html} from "lit";

export enum Department {
    Analytics = 0,
    Tech = 1
}

export const departmentList: { [key in Department]: () => ReturnType<typeof html> } = {
    [Department.Analytics]: () => html`${msg('Analytics')}`,
    [Department.Tech]: () => html`${msg('Tech')}`,
}
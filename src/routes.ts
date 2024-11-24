import {RouteConfig} from "@lit-labs/router";
import {html} from "lit";
import {environment} from "./environment/environment.ts";

export const routes: RouteConfig[] = [
    {
        path: environment.baseUrl + '/',
        render: () => html`
            <app-home></app-home>`,
        enter: async () => {
            await import('./pages/home.ts')
            return true;
        }
    },
    {

        path: environment.baseUrl + '/employees',
        render: () => html`
            <app-employee-list></app-employee-list>`,
        enter: async () => {
            await import('./pages/employee-list');
            return true;
        }
    },
    {

        path: environment.baseUrl + '/employees/add',
        render: () => html`
            <app-employee-add></app-employee-add>`,
        enter: async () => {
            await import('./pages/employee-add');
            return true;
        }
    },
    {

        path: environment.baseUrl + '/employees/:id',
        render: ({id}) => html`
            <app-employee-details .id=${id}></app-employee-details>`,
        enter: async () => {
            await import('./pages/employee-details');
            return true;
        }
    },
    {
        path: environment.baseUrl ? environment.baseUrl + '/(.*)' : '(.*)',
        render: () => html`
            <app-not-found></app-not-found>`,
        enter: async () => {
            await import('./pages/not-found');
            return true;
        }
    }
]
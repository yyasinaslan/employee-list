import {RouteConfig} from "@lit-labs/router";
import {html} from "lit";

export const routes: RouteConfig[] = [
    {

        path: '/',
        render: () => html`
            <app-home></app-home>`,
        enter: async () => {
            await import('./pages/home.ts')
            return true;
        }
    },
    {

        path: '/employees',
        render: () => html`
            <app-employee-list></app-employee-list>`,
        enter: async () => {
            await import('./pages/employee-list');
            return true;
        }
    },
    {

        path: '/employees/add',
        render: () => html`
            <app-employee-add></app-employee-add>`,
        enter: async () => {
            await import('./pages/employee-add');
            return true;
        }
    },
    {

        path: '/employees/:id',
        render: ({id}) => html`
            <app-employee-details .id=${id}></app-employee-details>`,
        enter: async () => {
            await import('./pages/employee-details');
            return true;
        }
    },
    {
        path: '(.*)',
        render: () => html`
            <app-not-found></app-not-found>`,
        enter: async () => {
            await import('./pages/not-found');
            return true;
        }
    }
]
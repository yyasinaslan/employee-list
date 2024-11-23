import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {routes} from "./routes.ts";
import {Router} from "@lit-labs/router";
import {sharedStyles} from "./styles/shared-styles.ts";


@customElement('app-shell')
export class AppShell extends LitElement {

    static styles = [
        ...sharedStyles,
        css`
            :host {
                display: grid;
                grid-template-rows: auto 1fr;
                justify-content: stretch;
                align-content: stretch;

                min-height: 100svh;
                max-height: 100svh;
            }

            app-header {
                background-color: hsl(var(--background));
                border-bottom: 1px solid hsl(var(--border));

                padding: 1rem;
            }

            main {
                padding: 1rem;
                display: grid;
                justify-content: stretch;
                align-content: stretch;
            }
        `
    ]

    private _router = new Router(this, routes);

    constructor() {
        super();
        window.router = this._router;
    }

    protected render() {

        return html`
            <app-header></app-header>
            <main>
                ${this._router.outlet()}
            </main>
        `
    }
}
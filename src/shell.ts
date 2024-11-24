import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {routes} from "./routes.ts";
import {Router} from "@lit-labs/router";
import {sharedStyles} from "./styles/shared-styles.ts";
import {headerHeight, mediaBreakpoints} from "./constants/media-breakpoints.ts";


@customElement('app-shell')
export class AppShell extends LitElement {

    static styles = [
        ...sharedStyles,
        css`
            :host {
            }

            app-header {
                position: sticky;
                top: 0;
                z-index: 100;
                height: ${headerHeight}px;

                background-color: hsl(var(--background));
                border-bottom: 1px solid hsl(var(--border));
            }

            main {
                padding: 1rem;
                //display: grid;
                //justify-content: stretch;
                //align-content: stretch;
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
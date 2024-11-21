import {css, html} from "lit";
import {customElement} from "lit/decorators.js";
import {MobxLitElement} from "@adobe/lit-mobx";
import {routes} from "./routes.ts";
import {Router} from "@lit-labs/router";
import {sharedStyles} from "./styles/shared-styles.ts";


@customElement('app-shell')
export class AppShell extends MobxLitElement {

    static styles = [
        ...sharedStyles,
        css`
            :host {
                display: grid;
                grid-template-rows: 60px 1fr;
                justify-content: stretch;
                align-content: stretch;

                min-height: 100svh;
                max-height: 100svh;
                overflow: clip;
            }

            app-header {
                background-color: hsl(var(--background));
                border-bottom: 1px solid hsl(var(--border));
            }

            main {
                padding: 1rem;
                overflow: auto;
            }
        `
    ]

    private _router = new Router(this, routes);

    protected render() {

        return html`
            <app-header></app-header>
            <main>
                ${this._router.outlet()}
            </main>
        `
    }
}
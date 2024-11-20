import {AppShell} from "./shell.ts";
import {HomeComponent} from "./pages/home.ts";


declare global {
    interface HTMLElementTagNameMap {
        [AppShell.is]: AppShell,
        [HomeComponent.is]: HomeComponent
    }
}

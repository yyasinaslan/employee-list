import {Router} from "@lit-labs/router";


declare global {
    interface Window {
        // Declare a global router
        router: Router;
    }
}
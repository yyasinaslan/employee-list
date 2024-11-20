import {Router} from '@vaadin/router'
import {routes} from "./routes.ts";

export * from "./components"
export * from "./shell"
const router = new Router(document.getElementById('router-outlet'))
router.setRoutes(routes)

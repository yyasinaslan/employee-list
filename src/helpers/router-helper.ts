

export class RouterHelper {



    static navigate(path: string) {
        history.pushState({}, "", path);
        return window.router.goto(path);
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tracing {
    constructor(parent) {
        this.parent = parent;
    }
    existsRoutes() {
        return "LetterTracing" in sessionStorage;
    }
    routes() {
        const routesJSON = sessionStorage.getItem("LetterTracing");
        const routes = JSON.parse(routesJSON);
        return routes;
    }
    init() {
        //@ts-ignore
        const newWindow = window;
        //TODO: do realtime tracking
        if (!this.existsRoutes()) {
            this.parent.createRequest("/stat/session", "POST", {
                action: "start",
            });
            sessionStorage.setItem("LetterTracing", "[]");
        }
        const start = Date.now(); //Get
        const pathname = location.pathname === "/" ? "/" : location.pathname.slice(1);
        //Save initial Route
        this.addRoute(pathname);
        //Set router handler by Framework
        if ("next" in newWindow) {
            newWindow.next.router.events.on("routeChangeComplete", (route) => this.addRoute(route.slice(1)));
        }
        //Send data on session end
        window.onunload = () => {
            const end = Date.now();
            const sessionTime = (end - start) / 1000; //Session time in seconds
            const tracingString = sessionStorage.getItem("LetterTracing");
            const routes = JSON.parse(tracingString);
            return this.parent.createRequest("/stat/session", "POST", {
                sessionTime,
                routes,
                action: "end",
                referrer: newWindow.referrer,
            });
        };
    }
    addRoute(route) {
        const routes = this.routes();
        routes.push(route);
        sessionStorage.setItem("LetterTracing", JSON.stringify(routes));
    }
}
exports.default = Tracing;

import { LetterProperties } from "../../index";

interface Events {
  on: Function;
}
interface Router {
  events: Events;
}
interface Next {
  router: Router;
}

interface NewWindow extends Window {
  next: Next;
  referrer?: string;
}

class Tracing {
  parent: LetterProperties;
  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  existsRoutes(): boolean {
    return "LetterTracing" in sessionStorage;
  }
  routes(): Array<string> {
    const routesJSON = sessionStorage.getItem("LetterTracing") as string;
    const routes: Array<string> = JSON.parse(routesJSON);

    return routes;
  }

  public init(): void {
    //@ts-ignore
    const newWindow: NewWindow = window;

    //TODO: do realtime tracking

    if (!this.existsRoutes()) {
      this.parent.createRequest("/stat/session", "POST", {
        action: "start",
      });

      sessionStorage.setItem("LetterTracing", "[]");
    }

    const start = Date.now(); //Get

    const pathname =
      location.pathname === "/" ? "/" : location.pathname.slice(1);

    //Save initial Route
    this.addRoute(pathname);

    //Set router handler by Framework
    if ("next" in newWindow) {
      newWindow.next.router.events.on(
        "routeChangeComplete",
        (route: string): void => this.addRoute(route.slice(1))
      );
    }

    //Send data on session end
    window.onunload = (): Promise<object> => {
      const end = Date.now();

      const sessionTime = (end - start) / 1000; //Session time in seconds

      const tracingString = sessionStorage.getItem("LetterTracing") as string;
      const routes: object = JSON.parse(tracingString);

      return this.parent.createRequest("/stat/session", "POST", {
        sessionTime,
        routes,
        action: "end",
        referrer: newWindow.referrer,
      });
    };
  }
  public addRoute(route: string): void {
    const routes = this.routes();

    routes.push(route);

    sessionStorage.setItem("LetterTracing", JSON.stringify(routes));
  }
}

export default Tracing;

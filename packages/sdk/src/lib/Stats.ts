import { LetterProperties } from "../index";
import Tracing from "./utils/tracing";

interface StatsOptions {
  os?: string;
  browser?: string;
  country?: string;
  url: string;
  start?: string;
  end?: string;
  fields?: Array<string>;
}

interface Stat {
  _id: string;
  __v: number;
  bounceRate?: string;
  subdomain?: string;
  creationDate?: string;
  totalViews?: number;
  bounces?: number;
  subscriptors?: number;
}
interface Days {
  Lunes: number;
  Martes: number;
  Miercoles: number;
  Jueves: number;
  Viernes: number;
  Sabado: number;
  Domingo: number;
}

interface Hours {
  "1AM": number;
  "2AM": number;
  "3AM": number;
  "4AM": number;
  "5AM": number;
  "6AM": number;
  "7AM": number;
  "8AM": number;
  "9AM": number;
  "10AM": number;
  "11AM": number;
  "12M": number;
  "1PM": number;
  "2PM": number;
  "3PM": number;
  "4PM": number;
  "5PM": number;
  "6PM": number;
  "7PM": number;
  "8PM": number;
  "9PM": number;
  "10PM": number;
  "11PM": number;
  "12AM": number;
}

interface StatPost {
  _id: string;
  title: string;
  comments: number;
  thumbnail: string;
  url: string;
  views: number;
}

interface StatResponse {
  general?: Stat;
  views?: Record<string, number>;
  os?: Record<string, number>;
  browsers?: Record<string, number>;
  countries?: Record<string, number>;
  hours?: Hours;
  days?: Days;
  dates?: Record<string, number>;
  total: number;
  growth: number;
  mostCommented?: StatPost;
  mostViewed?: StatPost;
}

class Stats {
  parent: LetterProperties;
  tracing: Tracing;
  constructor(parent: LetterProperties) {
    this.parent = parent;
    this.tracing = new Tracing(parent);
  }
  public async all(data?: StatsOptions): Promise<StatResponse> {
    return this.parent.createRequest("/stat", data);
  }
  public async setView(url: string, referrer: string): Promise<any> {
    return this.parent.createRequest("/stat/view", "POST", {
      url,
      referrer,
    });
  }
  startTrace(): void {
    this.tracing.init();
  }
}

export default Stats;

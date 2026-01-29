export interface Season {
  id: string;
  name: string;
  trips: Trip[];
  passes: SeasonPass[];
  services: SkiService[];
}

export interface SeasonPass {
  id: string;
  name: string;
  price: number;
}

export interface Trip {
  id: string;
  start: Date;
  // TODO these get generated automatically from the initial destination + trip length
  skiDays: SkiDay[];

  destination: string;
  description: string;
  people: string;

  regularPrice: number; // TODO
  actualPrice: number;
}

export interface SkiDay {
  id: string;
  ski: Ski[];
  dayDestination?: string;
}

export interface SkiService {
  id: string;
  date: Date;
  jobs: ServiceJob[];
}

export enum ServiceJob {
  WAX = 'WAX', EDGES = 'EDGES', REPAIR = 'REPAIR'
}


export interface Ski {
  id: string;
  company: string;
  model: string;
  year: number;
  // TODO add some specs here (radius, width (middle, tail, tip), length)
  services: SkiService[];
}

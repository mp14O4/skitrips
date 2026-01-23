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
  ski: Ski[];
  destinationOverride?: string; // TODO how can we best design this?
}

export interface SkiService {
  ski: Ski;
  date: Date;
}

export interface Ski {
  id: string;
  name: string;
}

// description:
//  home page has two groups: ski trips and skis
//  trips group has a dropdown on the top to select the season
//  i can add a trip
//  in the creation page for a trip, i can input basic data except SkiDays.
//  instead, there is a number input for the amount of days
//  when i create a trip, the SkiDays are created automatically from the amount.

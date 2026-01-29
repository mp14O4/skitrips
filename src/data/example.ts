import {Season, SeasonPass, Ski, SkiService, Trip} from './data';

const ski1: Ski = {
  id: 'am-ski-1',
  name: 'Völkl Mantra M6',
};

const ski2: Ski = {
  id: 'powder-ski-1',
  name: 'Armada JJ',
};

export const SKIS: Ski[] = [ski1, ski2];

const trip1: Trip = {
  id: 'trip-1',
  start: new Date('2025-12-20'),
  skiDays: [
    { ski: [ski1], id: '1day1' },
    { ski: [ski1], id: '1day2' },
  ],
  destination: 'Zermatt, Switzerland',
  description: 'A weekend trip to Zermatt to enjoy the pre-Christmas slopes.',
  people: 'John, Jane',
  regularPrice: 1000,
  actualPrice: 850,
};

const trip2: Trip = {
  id: 'trip-2',
  start: new Date('2025-12-29'),
  skiDays: [
    { ski: [ski1], id: '2day1' },
    { ski: [ski2], id: '2day2' },
    { ski: [ski2], id: '2day3' },
    { ski: [ski1], id: '2day4' },
  ],
  destination: 'Chamonix, France',
  description: 'Celebrating the new year in the French Alps.',
  people: 'John, Jane, Mike',
  regularPrice: 1500,
  actualPrice: 1300,
};

const pass1: SeasonPass = {
  id: 'pass-1',
  name: 'Ikon Pass',
  price: 1200,
};

const pass2: SeasonPass = {
  id: 'pass-2',
  name: 'Epic Pass',
  price: 1100,
};

const service1: SkiService = {
  ski: ski1,
  date: new Date('2025-11-15'),
};

const service2: SkiService = {
  ski: ski2,
  date: new Date('2026-01-10'),
};

export const WINTER_25_26: Season = {
  id: 'season-1',
  name: '2025/2026',
  trips: [trip1, trip2],
  passes: [pass1, pass2],
  services: [service1, service2],
};

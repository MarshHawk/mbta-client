export interface IRoute {
  id: string;
  directionNames: string[];
}

export interface IRouteResult {
  routes: IRoute[];
}

export interface IStop{
  id: string;
}

export interface IStopResult {
  stops: IStop[];
}

export interface IDeparture {
  id: string;
  departureTime: string;
  directionId: number;
  routeId: string;
}

export interface IDepartureResult {
  departures: IDeparture[];
}

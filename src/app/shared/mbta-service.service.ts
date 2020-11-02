import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { IDeparture, IDepartureResult, IRoute, IRouteResult, IStop, IStopResult } from "./mbta.interface";

@Injectable({
  providedIn: 'root'
})
export class MbtaService {

  constructor(private apollo: Apollo) { }

  public getRoutes(): Observable<IRoute[]> {
    const query = gql`query Routes {
      routes {
        id
        directionNames
      }
    }`
    return this.apollo.watchQuery<IRouteResult>({
      query
    }).valueChanges.pipe(
      map(result => result.data.routes)
    );
  }

  public getStops(routeId: string): Observable<IStop[]> {
    const query = gql`query Stops($routeId: String) {
      stops(routeId: $routeId) {
        id
      }
    }`
    return this.apollo.watchQuery<IStopResult>({
      query,
      variables: {
        routeId
      }
    }).valueChanges.pipe(
      map(result => result.data.stops)
    );
  }

  public getDepartures(stopId: string): Observable<IDeparture[]> {
    const query = gql`query Departure($stopId: String) {
      departures(stopId: $stopId) {
        id
        departureTime
        directionId
        routeId
      }
    }`
    return this.apollo.watchQuery<IDepartureResult>({
      query,
      variables: {
        stopId
      }
    }).valueChanges.pipe(
      map(result => result.data.departures)
    );
  }
}

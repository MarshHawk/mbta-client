import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { MbtaService } from 'src/app/shared/mbta-service.service';
import { IDeparture, IRoute, IStop } from 'src/app/shared/mbta.interface';

interface IState {
  selectedRoute?: IRoute;
  selectedStopId?: string;
  selectedDirectionIndex?: number;
  departureMessage?: string;
}

@Component({
  selector: 'app-route-stepper',
  templateUrl: './route-stepper.component.html',
  styleUrls: ['./route-stepper.component.scss']
})
export class RouteStepperComponent implements OnInit {
  routesFormGroup: FormGroup;
  stopsFormGroup: FormGroup;
  directionsFormGroup: FormGroup;

  routes$: Observable<IRoute[]>;
  stops$: Observable<IStop[]>;

  state: IState = { selectedRoute: { id: '', directionNames: [] } }

  @ViewChild('stepper') private stepper: MatStepper;

  constructor(private _formBuilder: FormBuilder, private _mbtaService: MbtaService, private _datePipe: DatePipe) { }

  ngOnInit(): void {
    this.routesFormGroup = this._formBuilder.group({
      route: [null as IRoute, Validators.required]
    });
    this.stopsFormGroup = this._formBuilder.group({
      stop: ['', Validators.required]
    });
    this.directionsFormGroup = this._formBuilder.group({
      direction: ['', Validators.required]
    });
    this.routes$ = this._mbtaService.getRoutes();
    this.stops$ = this.routesFormGroup.valueChanges.pipe(
      tap(r => this.state.selectedRoute = r.route),
      switchMap(result => this._mbtaService.getStops(result.route.id)),
      tap(_ => this.stepper.next()),
    );
    this.stopsFormGroup.valueChanges.pipe(
      tap(r => this.state.selectedStopId = r.stop),
      tap(_ => this.stepper.next())
    ).subscribe();
    this.directionsFormGroup.valueChanges.pipe(
      tap(r => this.state.selectedDirectionIndex = r.direction),
      switchMap(result => this._mbtaService.getDepartures(this.state.selectedStopId)),
      map(result => result.find(f => f.directionId === this.state.selectedDirectionIndex && f.departureTime !== null && new Date(f.departureTime) >= new Date(Date.now()) && f.routeId === this.state.selectedRoute.id)),
      tap(result => this._formatDirectionMessage(result)),
      tap(_ => this.stepper.next())
    ).subscribe();
  }

  private _formatDirectionMessage(departure: IDeparture) {
    this.state.departureMessage = departure ? `The next predicted departure time follows: ${this._datePipe.transform(departure.departureTime, 'medium')}` : 'There are no scheduled departures for the given criteria, please select different options.';
  }

}

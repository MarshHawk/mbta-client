import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import { RouteStepperComponent } from './route-stepper/route-stepper.component';
import { StepperRoutingModule } from './stepper-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from '@angular/forms';
//import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [RouteStepperComponent],
  imports: [
    CommonModule,
    StepperRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
  providers: []
})
export class StepperModule { }

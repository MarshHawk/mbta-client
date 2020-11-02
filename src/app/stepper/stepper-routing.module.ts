import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteStepperComponent } from './route-stepper/route-stepper.component';

const routes: Routes = [
  {
    path:'',
    component: RouteStepperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepperRoutingModule{ }

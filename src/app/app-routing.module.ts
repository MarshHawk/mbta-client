import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepperModule } from './stepper/stepper.module';

const routes: Routes = [
  {
    path:'stepper',
    loadChildren: () => StepperModule
},
{
    path: '',
    redirectTo: 'stepper',
    pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

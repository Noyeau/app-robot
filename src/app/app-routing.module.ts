import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImmersionPageComponent } from './pages/immersion-page/immersion-page.component';
import { EnvironmentAnalyserComponent } from './pages/environment-analyser/environment-analyser.component';

const routes: Routes = [
  {
    path:"", component:ImmersionPageComponent,
  },
  {
    path:"analyse", component:EnvironmentAnalyserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

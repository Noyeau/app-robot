import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { ImmersionComponent } from './components/immersion/immersion.component';
import { RadarComponent } from './components/radar/radar.component';
import { ImmersionPageComponent } from './pages/immersion-page/immersion-page.component';
import { JoystickComponent } from './components/joystick/joystick.component';
import { SvgComponent } from './components/svg/svg.component';
import { CameraConfigComponent } from './components/camera-config/camera-config.component';
import { environment } from 'src/environments/environment';
import { EnvironmentAnalyserComponent } from './pages/environment-analyser/environment-analyser.component';
import { ButtonMenuComponent } from './components/button-menu/button-menu.component';


const config: SocketIoConfig = { url: environment.robotUrl+'/', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    ImmersionPageComponent,
    ImmersionComponent,
    RadarComponent,
    JoystickComponent,
    SvgComponent,
    CameraConfigComponent,
    EnvironmentAnalyserComponent,
    ButtonMenuComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

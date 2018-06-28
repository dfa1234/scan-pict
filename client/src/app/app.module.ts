import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ApiProvider } from '../providers/api/api';
import {PipesModule} from "../pipes/pipes.module";
import {Camera} from "@ionic-native/camera";
import {HttpClientModule} from "@angular/common/http";
import {ModalResultPage} from "../pages/modal-result/modal-result";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalResultPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    PipesModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalResultPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}

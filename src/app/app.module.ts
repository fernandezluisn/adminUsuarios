import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from '@angular/fire'; 
import {environment} from '../environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';

import {AuthService} from '../app/servicios/auth.service';
import {BdaService} from '../app/servicios/bda.service';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    BarcodeScanner,
    AuthService,
    BdaService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

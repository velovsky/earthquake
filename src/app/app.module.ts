import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AgmCoreModule } from '@agm/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

import { environment } from 'src/environments/environment';
import { EarthquakeCardComponent } from './earthquake-card/earthquake-card.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    EarthquakeCardComponent,
    SidenavMenuComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleAPI
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

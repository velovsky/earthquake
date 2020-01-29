import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpLoadingService } from './core/interceptors/http-loading.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EarthquakeCardComponent } from './dashboard/earthquake-card/earthquake-card.component';
import { LoaderComponent } from './dashboard/loader/loader.component';
import { SidenavMenuComponent } from './dashboard/sidenav-menu/sidenav-menu.component';



@NgModule({
  declarations: [
    AppComponent,
    EarthquakeCardComponent,
    SidenavMenuComponent,
    DashboardComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleAPI
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

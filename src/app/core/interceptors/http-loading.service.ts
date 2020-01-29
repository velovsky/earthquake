import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { LoaderService } from '@app/dashboard/loader/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpLoadingService implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      this.loaderService.setLoading(true);
      this.totalRequests++;

      return next.handle(request).pipe(
          tap(event => {
              return event;
          }),
          finalize(() => {
              this.totalRequests--;
              if (this.totalRequests === 0) {
                  this.loaderService.setLoading(false);
              }
          })
      );
  }
}

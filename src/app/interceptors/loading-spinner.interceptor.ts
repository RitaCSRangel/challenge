import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerServiceService } from '../services/spinnerService/spinner-service.service';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private loader: SpinnerServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('caught')
    this.totalRequests++;
    this.loader.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loader.setLoading(false);
        }
      })
    );
  }
}

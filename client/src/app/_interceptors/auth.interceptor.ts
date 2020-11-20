import { Injectable } from '@angular/core';
import { TokenService } from '../_services/auth/token.service';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.tokenService.getToken())
    })

    return next.handle(authReq);
  
  }

}
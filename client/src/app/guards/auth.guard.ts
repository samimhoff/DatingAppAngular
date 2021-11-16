import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

// PURPOSE: This file is where we configure our Authentication Guard for routing. This is the functionality that we can then implement that
//    allows us to make it so certain routes aren't accessible -- especially if the url is entered in manually by the user. 
//    With buttons we can obviously conditionally make functions fire off and redirect the user or not, but just buttons don't stop
//    the user from manually typing in the url. This does and is necessary.
// NOTE: This is NOT actual security. There is no such thing as security on a client-side application. You need tokens/ checks on every request.

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastr: ToastrService){}
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) return true;
        this.toastr.error('You shall not pass!')
      })
    )
  }
  
}

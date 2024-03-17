import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const authStatus = inject(ApiService)
  const toast = inject(NgToastService)
  const router = inject(Router)

  if(authStatus.isLoggedIn()){
    return true;
  }
  else{
    toast.warning({detail:"WARNING",summary:"Operation denied... Please login!!!",duration:2500});
    router.navigateByUrl("/")
    return false
  }
};

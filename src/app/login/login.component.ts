import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]]
  })

  constructor(private fb:FormBuilder, private api:ApiService, private toast:NgToastService, private router:Router){}

  handleLogin(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      const user = {email,password}
  
      this.api.loginAPI(user).subscribe({
        next:(res:any)=>{
          // console.log(res);
          sessionStorage.setItem("token",res.token)
          this.toast.success({detail:"SUCCESS",summary:`Login Successfull..`,duration:2500});
          this.loginForm.reset()
          this.router.navigateByUrl('/dashboard')
        },
        error:(reason:any)=>{
          // console.log(reason.error);
          this.toast.error({detail:"ERROR",summary:reason.error,duration:2500})
        }
      })      
    }
    else{
      this.toast.warning({detail:"WARNING",summary:"Please fill the form completely",duration:2500});
    }

  }

}

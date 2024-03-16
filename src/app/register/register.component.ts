import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })

  constructor(private fb:FormBuilder, private api:ApiService, private toast:NgToastService, private router:Router){}

  handleRegister(){
    // console.log(this.registerForm.value.username,this.registerForm.value.email,this.registerForm.value.password,);
    if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      const user = {username,email,password}

      this.api.registerAPI(user).subscribe({
        next:(res:any)=>{
          this.toast.success({detail:"SUCCESS",summary:`${res.username} has been registered successfully!!! Please login...`,duration:2500});
          this.registerForm.reset()
          this.router.navigateByUrl('/login')
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

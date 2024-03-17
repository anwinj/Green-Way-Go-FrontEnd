import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  @Output() onUserUpdate = new EventEmitter()

  showModal = false;
  userDetails:any = {}
  profilePicture:string = "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1709116294~exp=1709116894~hmac=6d3f4c643a3e86247f8749cab2d42a0e936662a75578b8bc3e9735f44cdc98a5"
  userProfile:string= ''
  SERVER_URL:string = ""
  profileUpdateStatus:boolean = false

  updateProfileForm = this.fb.group({
    username:['',[Validators.required]],
    email:['',[Validators.required]],
    password:['',Validators.required],
    location:['',Validators.required]
  })

  constructor(private api:ApiService, private fb:FormBuilder, private toast:NgToastService) {
    this.SERVER_URL = api.SERVER_URL
  }
  
  viewModal(){
    this.showModal = true;
    this.getUserDetails()
  }

  closeModal(){
    this.showModal = false;
    this.updateProfileForm.reset()
    this.profilePicture="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1709116294~exp=1709116894~hmac=6d3f4c643a3e86247f8749cab2d42a0e936662a75578b8bc3e9735f44cdc98a5"
    this.profileUpdateStatus = false
    this.userDetails = {}
    
  }

  getUserDetails(){
    this.api.getUserDetailsAPI().subscribe(
      (res:any)=>{
        this.userDetails = res
        if(res.profile){
          this.profilePicture = res.profile
        }
        this.updateProfileForm.patchValue({
          username: this.userDetails.username,
          email: this.userDetails.email,
          password: this.userDetails.password,
          location: this.userDetails.location
        });
        
    })
  }

  getFile(event:any){
    this.userProfile = event.target.files[0]
    let file = event.target.files[0]
    let fr = new FileReader
    fr.readAsDataURL(file)
    fr.onload = (event:any)=>{
      this.profilePicture = event.target.result
      this.profileUpdateStatus = true
    }
  }

  handleUpdate(){
    if(this.updateProfileForm.valid){

      const username = this.updateProfileForm.value.username
      const email = this.updateProfileForm.value.email
      const password = this.updateProfileForm.value.password
      const profile = this.userProfile
      const location = this.updateProfileForm.value.location

      const user = {
        username, email, password, profile, location
      }

      this.api.updateUserDetails(user).subscribe({
        next:(res:any)=>{
          this.toast.success({detail:"SUCCESS",summary:`Profile updated successfully..`,duration:2500});
          this.onUserUpdate.emit(true)
          this.closeModal()
        },
        error:(reason:any)=>{
          console.log(reason);
          this.toast.error({detail:"ERROR",summary:reason.error,duration:2500})
        }
      })
      
    }
    else{
      this.toast.warning({detail:"WARNING",summary:"Please fill the form completely",duration:2500});
    }
  }

}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-commute',
  templateUrl: './add-commute.component.html',
  styleUrls: ['./add-commute.component.css']
})
export class AddCommuteComponent {

  // event emitter
  @Output() onAddCommute = new EventEmitter()

  showModal = false;
  maxDate?:string;
  addCommuteForm = this.fb.group({
    commuteMethod:[null,[Validators.required]],
    kilometers:['',[Validators.required,Validators.pattern('[0-9]*')]],
    date:['',[Validators.required]]
  })
  
  constructor(private fb:FormBuilder, private toast:NgToastService, private api:ApiService){
    const today = new Date()
    console.log(today);
    this.maxDate = today.toISOString().split('T')[0]    
  }

  toggleModal(){
    this.showModal = !this.showModal;
    this.addCommuteForm.reset()
  }

  handleAddCommute(){
    if(this.addCommuteForm.valid){
      const date = this.addCommuteForm.value.date
      const commuteMethod = this.addCommuteForm.value.commuteMethod
      const kilometers = this.addCommuteForm.value.kilometers
      const commute = {date,commuteMethod,kilometers}

      this.api.addCommuteAPI(commute).subscribe({
        next:(res:any)=>{
          this.toast.success({detail:"SUCCESS",summary:"Commute added",duration:2500})
          this.onAddCommute.emit(true)
          this.toggleModal()
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

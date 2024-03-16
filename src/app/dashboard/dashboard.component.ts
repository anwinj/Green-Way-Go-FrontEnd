import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails:any = {}
  allCommute:any = []
  allCommuteCopy:any = []

  constructor(private api:ApiService,private toast:NgToastService){}

  ngOnInit(): void {
    this.getUserDetails()
    this.getAllUserCommute()
  }

  getUserDetails(){
    this.api.getUserDetailsAPI().subscribe(
      (res:any)=>{
        this.userDetails = res
    })
  }

  getAllUserCommute(){
    this.api.getAllUserCommuteAPI().subscribe(
      (res:any)=>{
        this.allCommute = res
        // console.log(res);
        const mappedArr = this.allCommute.map((item:any)=>{
          return {...item,date:new Date(item.date)}
        })
        this.allCommuteCopy = mappedArr.sort((a:any,b:any)=>b.date - a.date)
        // console.log(this.allCommuteCopy);
      }
    )
  }

  onAddCommute(event:any){
    this.getAllUserCommute()
  }

  getDay(dateString:string){
    const date = new Date(dateString)
    return date.getDate()
  }

  getMonth(dateString:string){
    const date = new Date(dateString)
    const month = date.getMonth();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[month]
  }

  getYear(dateString:string){
    const date = new Date(dateString)
    return date.getFullYear()
  }

  deleteCommute(id:any){
    this.api.deleteCommuteAPI(id).subscribe({
      next:(res:any)=>{
        this.getAllUserCommute()
        this.toast.success({detail:"SUCCESS",summary:res,duration:2500});
      },
      error:(reason:any)=>{
        console.log(reason);
        this.toast.warning({detail:"WARNING",summary:"Delete failed... please try after some time",duration:2500});
      }
    })
  }
  
}

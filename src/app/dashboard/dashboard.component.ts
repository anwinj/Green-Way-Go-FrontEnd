import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails:any = {}
  allCommute:any = []
  allCommuteCopy:any = []
  monthInfo:any = {}
  totalPoints:number = 0
  co2esaved:number = 0
  milestone:any = {}
  SERVER_URL:string = ""
  categoryKey:string = ""

  constructor(private api:ApiService,private toast:NgToastService, private router:Router){
    this.SERVER_URL = api.SERVER_URL
  }

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
        const mappedArr = res.map((item:any)=>{
          return {...item,date:new Date(item.date)}
        })
        this.allCommuteCopy = mappedArr.sort((a:any,b:any)=>b.date - a.date)
        // console.log(this.allCommuteCopy);
        this.getStatistics()
      }
    )
  }

  getStatistics(){
    if(this.allCommute.length==0){
      this.totalPoints = 0
      this.co2esaved = 0
      this.monthInfo.month = 'month'
      this.monthInfo.noOfCommutes = 0
      this.monthInfo.totalKilometers = 0
      this.monthInfo.monthPoints = 0
      this.milestone.level = 0
      this.milestone.lowerLimit = 0
      this.milestone.upperLimit = 0
      this.milestone.barValue = 0
    }
    else{
      // total points
    this.totalPoints = Math.ceil(this.allCommute.map((commute:any)=>commute.points).reduce((a:number,b:number)=>a+b))
    // console.log(`Total points: ${this.totalPoints}`);
    
    // co2esaved
    this.co2esaved = Math.floor(this.totalPoints * .0367 * 3)

    // this month
    const today = new Date()
    const month = today.getMonth() 
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.monthInfo.month = monthNames[month]
    let mappedArr = this.allCommute.map((item:any)=>{
      return {...item,date:new Date(item.date)}
    })
    let filteredObjects = mappedArr.filter((commute:any) => commute.date.getMonth() === month);
    if(filteredObjects.length>0){
      this.monthInfo.noOfCommutes = filteredObjects.length
      this.monthInfo.totalKilometers = filteredObjects.map((commute:any)=>commute.kilometers).reduce((a:number,b:number)=>a+b)
      this.monthInfo.monthPoints = Math.ceil(filteredObjects.map((commute:any)=>commute.points).reduce((a:number,b:number)=>a+b))
      // console.log(this.monthInfo);
    }
    else{
      this.monthInfo.noOfCommutes = 0
      this.monthInfo.totalKilometers = 0
      this.monthInfo.totalKilometers = 0
      this.monthInfo.monthPoints = 0
    }

    // milestone
    this.milestone.level = Math.ceil(this.totalPoints/100)
    this.milestone.lowerLimit = (this.milestone.level-1)*100
    this.milestone.upperLimit = (this.milestone.level)*100
    this.milestone.barValue = this.totalPoints%100==0?100:this.totalPoints%100
    // console.log(this.milestone);
    }
    
  }

  onAddCommute(event:any){
    this.getAllUserCommute()
  }

  getDay(dateString:string){
    const date = new Date(dateString)
    return date.getDate()
  }

  getMonthInfo(dateString:string){
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

  onUserUpdate(event:any){
    this.getUserDetails()
  }

  setCategoryKey(category:string){
    this.categoryKey = category
  }

  Logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('/')
    this.userDetails = {}
  }
  
}

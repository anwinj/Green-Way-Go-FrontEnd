import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // server url
  SERVER_URL:string = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`,user)
  }

  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`,user)
  }

  // append header
  appendTokenHeader(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders
    if(token){
      headers = headers.append("Authorization",`Beares ${token}`)
    }
    return {headers}
  }

  getUserDetailsAPI(){
    return this.http.get(`${this.SERVER_URL}/get-user`,this.appendTokenHeader())
  }

  addCommuteAPI(commute:any){
    return this.http.post(`${this.SERVER_URL}/add-commute`,commute,this.appendTokenHeader())
  }

  getAllUserCommuteAPI(){
    return this.http.get(`${this.SERVER_URL}/get-commute`,this.appendTokenHeader())
  }

  deleteCommuteAPI(id:string){
    return this.http.delete(`${this.SERVER_URL}/delete-commute/${id}`,this.appendTokenHeader())
  }

}

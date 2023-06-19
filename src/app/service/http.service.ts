import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
   baseUrl:string="https://devrunner.co.in/machine_test/index.php/web_api/Users/";

   
  constructor(private httpClient:HttpClient) { 

  }
  getDataFromServer(endpoint:string){
    const url=this.baseUrl + endpoint;
     return this.httpClient.get('url')
  }
  saveDataFromServer(endpoint:string, requestBody:any){
    const url = this.baseUrl + endpoint;
    return  this.httpClient.post(url,requestBody)

  }
  updateData(){

  }
  deleteData(){

  }
}

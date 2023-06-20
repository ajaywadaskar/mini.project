import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  errorMessage:string='';
  
  constructor(private fb:FormBuilder,private http:HttpService){

  }
  ngOnInit(): void {
   this.createFormstructure();
  }
 createFormstructure(){
  // this.loginForm.controls..patchValue(this.defaultValue);

   this.loginForm=this.fb.group({
    
    'user_email':this.fb.control(''),
    'user_password':this.fb.control(''),
    

   })
 }
 login(){
 
   let endPoint = 'login?' + 'user_email='+ this.loginForm.get('user_email')?.value + '&'+ 'user_pwd=' + this.loginForm.get('user_password')?.value;
   this.errorMessage="";
      this.http.getDataFromServer(endPoint).subscribe(
        (responce:any)=>{
           if(responce && responce.status===0){
             this.errorMessage=responce.message;
           }
        },
        ()=>{

        } )
      }             
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm!:FormGroup;
  message:string="";
  constructor(private fb:FormBuilder,private http:HttpService){

  }
  ngOnInit(): void {
   this.createFormstructure();
  }
 createFormstructure(){
   this.signupForm=this.fb.group({
    'name':this.fb.control(''),
    'mobile':this.fb.control(''),
    'email':this.fb.control(''),
    'password':this.fb.control(''),
    'gender':this.fb.control('')

   })
 }
 signup(){
  let formData:any 
  formData = new formData();
  formData.set('user_name',this.signupForm.get('name')?.value);
  formData.set('user_email',this.signupForm.get('email')?.value);
  formData.set('user_gender',this.signupForm.get('gender')?.value);
  formData.set('user_contact_no',this.signupForm.get('mobile')?.value);
  formData.set('user_password',this.signupForm.get('password')?.value);
 
  
  
  this.http.saveDataFromServer('Register',formData).subscribe(
      (responce:any)=>{
        if(responce && responce.status ===1){
           this.message=responce.message; 
        }
      },
      (error)=>{

      })
    }
  }

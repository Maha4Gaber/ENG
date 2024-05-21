import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){
    if(localStorage.getItem('userToken')){
      this._Router.navigate(['./home'])
    }
  }
  islouding:boolean=false;
  apiError:string = '' ;

  loginform:FormGroup=new FormGroup({
    email: new FormControl(null , [ Validators.required , Validators.email ]),
    password: new FormControl(null , [ Validators.required , Validators.minLength(6) , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/) ]),
  })
  handlelogin=(loginform: FormGroup)=> {
    this.islouding=true;
    if(loginform.valid){
      this._AuthService.login(loginform.value).subscribe({
        next:(response) => {
          if(response.message=='success'){
            localStorage.setItem('userToken',response.token)
            this._AuthService.decodeUserdata();
            this.islouding=false;
            this._Router.navigate(['./home'])
          }
        },
        error:(err) =>{
          this.islouding=false;
          if(err.error.message=='fail')
          {
            this.apiError = err.error.errors.msg ;
          }
          else
          {
            this.apiError = err.error.message ;
          }
          
          
        }
        
      })
    }
  }
}

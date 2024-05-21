import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:[ './register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){
    if(localStorage.getItem('userToken')){
      this._Router.navigate(['./home'])
    }
  }
  islouding:boolean=false;
  apiError:string = '' ;

  registerform:FormGroup=new FormGroup(
    {
    name: new FormControl(null , [ Validators.required , Validators.minLength(3) ]),
    email: new FormControl(null , [ Validators.required , Validators.email ]),
    password: new FormControl(null , [ Validators.required , Validators.minLength(6) , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/) ]),
    rePassword: new FormControl(null , [ Validators.required , Validators.minLength(6) , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/) ]),
    phone: new FormControl(null , [ Validators.required , Validators.pattern(/^01[125][0-9]{8}$/) ]),
  } )
  // , {Validators : this.repasswordMatch});







  repasswordMatch(registerform:any){
    let password=registerform.get('password')
    let rePassword=registerform.get('rePassword')
    if(password.value === rePassword.value)
    {
      return null;
    }
    else
    {
      rePassword.setErrors({passwordMach:'password and repassword dosent match'})
      return {passwordMach:'password and repassword dosent match'}
    }

  }
  handleregister=(registerform: FormGroup)=> {
    this.islouding=true;
    if(registerform.valid){
      this._AuthService.register(registerform.value).subscribe({
        next:(response) => {
          if(response.message=='success'){
          this.islouding=false;

            this._Router.navigate(['./login'])
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
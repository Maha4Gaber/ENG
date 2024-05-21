import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-chekout',
  templateUrl: './chekout.component.html',
  styleUrls: ['./chekout.component.css']
})
export class ChekoutComponent {
  constructor(private _CartService:CartService){}
  shippingAddress:FormGroup=new FormGroup({
    details: new FormControl(null ),
    phone: new FormControl(null ),
    city: new FormControl(null ),
  })
  navigatto(url:string){
    window.location.href = url
  }
  handelCheckout(shippingAddress:FormGroup){
    this._CartService.onlinePayment(shippingAddress.value,"").subscribe({
      next: (res) =>{
        this.navigatto(res.session.url)
      },
      error: (err) =>{
        console.log(err);
        
      }
    })
  }
}

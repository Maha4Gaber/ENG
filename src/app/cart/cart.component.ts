import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartDetails:any =null
  constructor( private _CartService:CartService){}
  removeCartItem(productid:string){
    this._CartService.removeCartItem(productid).subscribe({
      next:(res) => {
        this.cartDetails = res.data
        this._CartService.numberofItem.next(res.numOfCartItems)
        console.log(res)}
      
    })
  }
  updateCountIten(productid:string ,count:number){
    this._CartService.updateCountIten(productid,count).subscribe({
      next:(res) => {
        this.cartDetails = res.data
        
        console.log(res)}
      
    })
  }

  ngOnInit(): void{
    this._CartService.getCart().subscribe({
      next:(res) => this.cartDetails = res.data
    })
  }
}

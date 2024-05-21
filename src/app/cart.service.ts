import { Injectable } from '@angular/core';
import { Observable ,BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  headers:any={
    token:localStorage.getItem('userToken')
  }
  numberofItem = new BehaviorSubject(0)
  constructor(private _HttpClient:HttpClient) {
    this.getCart().subscribe({
      next: (res) =>{
        this.numberofItem.next(res.numOfCartItems)
        console.log(res);
        
      },
      error: (err) =>{
        console.log(err);
        
      }
    })
  }
  addToCart(productid:string):Observable<any>
  {
    return this._HttpClient.post('https://route-ecommerce.onrender.com/api/v1/cart',
    {productId:productid},
    {headers:this.headers}
    )
  }
  getCart():Observable<any>
  {
    return this._HttpClient.get('https://route-ecommerce.onrender.com/api/v1/cart',
    {headers:this.headers}
    )
  }
  removeCartItem(productid:string):Observable<any>
  {
    return this._HttpClient.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productid}`,
    {headers:this.headers}
    )
  }
  updateCountIten(productid:string,count:number):Observable<any>
  {
    return this._HttpClient.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productid}`,
    {count:count},
    {headers:this.headers}
    )
  }
  onlinePayment(cartid:string,shippingAddress:any):Observable<any>
  {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:4200`,
    {shippingAddress:shippingAddress},
    {headers:this.headers}
    )
  }
}

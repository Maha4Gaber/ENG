import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent  implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute
    ,private _ProductsService:ProductsService){}
  productId : any;
  productdetails : any;
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe((params)=>{
        this.productId=params.get('id');
        
      })
      this._ProductsService.getProductdetails(this.productId).subscribe({
        next:(res) => this.productdetails = res.data
      })
  }
  
  
}

import { NgModule } from '@angular/core';
import { RouterModule ,  Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './auth.guard';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ChekoutComponent } from './chekout/chekout.component';


const routes: Routes = [
  {path:'' , redirectTo:'home'  , pathMatch:'full'} , 
  {path:'home' , component:HomeComponent} , 
  {path:'about' , canActivate:[AuthGuard] , component:AboutComponent} , 
  {path:'categories' , canActivate:[AuthGuard] , component:CategoriesComponent} , 
  {path:'cart' , canActivate:[AuthGuard] , component:CartComponent} , 
  {path:'brands' , canActivate:[AuthGuard] , component:BrandsComponent} , 
  {path:'checkout' , canActivate:[AuthGuard] , component:ChekoutComponent} , 
  {path:'productdetails/:id' , canActivate:[AuthGuard] , component:ProductdetailsComponent} , 
  {path:'login'  , component:LoginComponent} , 
  {path:'register'  , component:RegisterComponent} , 
  {path:'**'  , component:NotfoundComponent} , 
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{useHash:true})] , 
  exports: [RouterModule]
})
export class AppRoutingModule { }

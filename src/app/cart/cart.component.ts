import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  data:any;
  constructor(private acrouter:ActivatedRoute,private router:Router) {
   }

  ngOnInit() {
    this.data=this.acrouter.snapshot.queryParams['data'];
    this.data=JSON.parse(this.data);
    console.log(this.data);
    this.calculate();
  }

  tax:any=0;
  mrp:any=0;
  ordertotal:any=0;
  totalamount:any=0;
  calculate()
  {
    this.tax=0;
    this.mrp=0;
    this.ordertotal=0;
    this.totalamount=0;
    for(let i=0;i<this.data.length;i++)
    {
      this.mrp+=this.data[i].price;
    }
    this.tax=(this.mrp*(0.18)).toPrecision(3);
    this.ordertotal=this.mrp + parseInt(this.tax);
    this.totalamount=120+this.ordertotal;
  }

  homepage()
  {
    this.router.navigate(['']);
  }

  removefrombag(index)
  {
    console.log(index);
    this.data.splice(index);
    this.calculate();
  }

  goToWishlist(){
    this.router.navigate(['/wishlist'],{ queryParams: { data: JSON.stringify(this.wishlistData) } });
  }

  wishlistcount:any=0;
  cartdata : any =[];
  wishlistData :any =[];
  addToWishlist(id)
  {
    let index = this.data.findIndex(x => x.id == id);
    this.wishlistData.push(this.data[index]);
    this.wishlistcount++;
    this.removefrombag(index);
  }

  goToPayment(){
    this.router.navigate(["/payment"]);
  }
}

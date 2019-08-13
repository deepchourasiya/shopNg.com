import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private router:Router,private acrouter: ActivatedRoute) { }
 data: any;
  ngOnInit() {
    this.data=this.acrouter.snapshot.queryParams['data'];
    this.data=JSON.parse(this.data);
  }

  homepage()
  {
    this.router.navigate(['']);
  }

  removefrombag(index)
  {
    console.log(index);
    this.data.splice(index);
  }

  cartdata:any= [];
  bagcount:any = 0;
  addToCart(id) {
    let index = this.data.findIndex(x => x.id == id);
    this.cartdata.push(this.data[index]);
    this.bagcount++;
  }
  goToCart() {
    this.router.navigate(['/cart'], { queryParams: { data: JSON.stringify(this.cartdata) } });
  }

}

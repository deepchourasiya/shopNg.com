import { Component, OnInit } from '@angular/core';
import { MatToolbarModule, MatIcon } from '@angular/material';
import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import * as _ from 'lodash'
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // movies = new BehaviorSubject([]);
  arrNumber: number[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    for (let i = 0; i < 10000; i++) {
      this.arrNumber.push(i);
    }
  }

  ngOnInit() {
    this.getDataofProducts();
  }


  data: any = [];
  getDataofProducts() {
    this.http.get("assets/product.json").subscribe(response => {
      this.data = response;
    });
  }

  cartdata: any = [];
  addToCart(id) {
    let index = this.data.findIndex(x => x.id == id);
    this.cartdata.push(this.data[index]);
    this.bagcount++;
    //this.router.navigate(['./cart']);
  }

  bagcount: any = 0;

  goToCart() {
    this.router.navigate(['/cart'], { queryParams: { data: JSON.stringify(this.cartdata) } });
  }

  wishlistcount: any = 0;
  wishlistData: any=[];
  addToWishlist(id) {
    let index = this.data.findIndex(x => x.id == id);
    this.wishlistData.push(this.data[index]);
    this.wishlistcount++;
  }
  
  sort(value) {
    if (value.trim() == "low") {
      this.sortAsc();
    }
    else
      this.sortDesc();
  }

  sortAsc() {
    let data = this.data;
    this.data = [];
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[i].price > data[j].price) {
          temp = data[i];
          data[i] = data[j];
          data[j] = temp;
        }
      }

    }
    for (let i = 0; i < data.length; i++) {
      this.data.push(data[i]);
    }
  }

  sortDesc() {
    let data = this.data;
    this.data = [];
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[i].price < data[j].price) {
          temp = data[i];
          data[i] = data[j];
          data[j] = temp;
        }
      }

    }
    for (let i = 0; i < data.length; i++) {
      this.data.push(data[i]);
    }
  }

  values: any = '';
  onKeyUp(event: any) {
    this.values = event.target.value;    
    if (this.values == "") {
      console.log("if");
      this.getDataofProducts();
      return;
    }    
    else {
      let data = this.data;
      this.data = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].name.trim().toLowerCase().indexOf(this.values.trim().toLowerCase()) > -1)
          this.data.push(data[i]);
      }
    }
  };

  goToWishlish() {
    this.router.navigate(["/wishlist"],{ queryParams: { data: JSON.stringify(this.wishlistData) } });
  }

}

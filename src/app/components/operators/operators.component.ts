import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product-service';
import { first, map, of } from 'rxjs';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card m-2 p-2">
            <div class="card-header">Operators</div>
            <div class="card-body">
                <div class="row">
                    <div>
                      <h2>Products For Sale</h2>
                      <table class="products-table table table-striped">
                        <tr>
                          <th>#</th>
                          <th>NAME</th>
                          <th>PRICE</th>
                          <th>QUANTITY</th>
                          <th>DESCRIPTION</th>
                        </tr>
                        <tr
                          *ngFor="let product of products; let index = index"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>{{ product.title }}</td>
                          <td>{{ product.price | currency : ' KES ' }}</td>
                          <td>{{ product.quantity}}</td>
                          <td>{{ product.description }}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
            </div>
            <div class="card-footer">
              <a
                href="https://github.com/Jonnykratz/angularReactive"
                class="btn btn-primary"
                >Github</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent {
  private readonly productService = inject(ProductService);
  products = [] as Product[];
  numbers = [] as number[];

  ngOnInit(): void {
    this.getProducts()
    this.getNumbers();
  }

  getNumbers(){
    of(2, 3, 4)
      .pipe(first(), map((x) => x * x))
      .subscribe((v) => {
        console.log(`value: ${v}`);
        this.numbers.push(v);
      });
      console.log(`numbers: ${this.numbers}`);
  }

  getProducts(){
     this.productService.getProducts().pipe(first()).subscribe(data => this.products = data);
  }
}

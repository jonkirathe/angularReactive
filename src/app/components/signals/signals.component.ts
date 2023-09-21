import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, effect, signal} from "@angular/core";
import { Product } from 'src/app/models/product';
import { Cart } from 'src/app/models/cart';


@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card m-2 p-2">
            <div class="card-header">Signals</div>
            <div class="card-body">
              <h5 class="card-title">
                <h1>Shop your favourite animal</h1>
                <h4>Get it at a discount</h4>
              </h5>
              <div class="card-body">
                <div class="row">
                  <div class="box content ">
                    <h2><strong>Shopping Cart </strong></h2>
                    <table class="shadow">
                      <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>ACTION</th>
                      </tr>
                      <tr *ngFor="let product of cart(); let index = index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price | currency : ' KES ' }}</td>
                        <td>{{ product.qty }}</td>
                        <td>
                          <button
                            (click)="deleteCartItem(index)"
                            class="button delete-button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </table>
                    <h2 class="text-dark">
                      TOTAL QTY:
                      <strong [style.color]="color()"
                        >{{ totalQuantity() }}
                      </strong>
                    </h2>
                    <h2 class="text-dark">
                      TOTAL PRICE:
                      <strong [style.color]="color()"
                        >{{ totalPrice() | currency : ' KES ' }}
                      </strong>
                    </h2>
                    <br />
                    <hr />
                    <div>
                      <h2>Kenyan Animals For Sale</h2>
                      <table class="products-table">
                        <tr>
                          <th>#</th>
                          <th>NAME</th>
                          <th>PRICE</th>
                          <th>QUANTITY</th>
                          <th>DESCRIPTION</th>
                          <th>SELECT QUANTITY</th>
                          <th>ACTION</th>
                        </tr>
                        <tr
                          *ngFor="let product of products(); let index = index"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>{{ product.title }}</td>
                          <td>{{ product.price | currency : ' KES ' }}</td>
                          <td>{{ product.quantity }}</td>
                          <td>{{ product.description }}</td>
                          <select
                            (change)="
                              quantitySelected($any($event.target).value)
                            "
                          >
                            <option disabled value="">Select a quantity</option>
                            <option *ngFor="let quantity of quantityList()">
                              {{ quantity }}
                            </option>
                          </select>
                          <td>
                            <button
                              class="button buy-button"
                              (click)="addToCart(product, index)"
                            >
                              Buy
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
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
  styleUrls: ['./signals.component.scss'],
})
export class SignalsComponent {
  quantityList = signal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  quantity = signal<number>(0);
  totalQuantity = signal<number>(0);
  totalPrice = signal<number>(0);
  products = signal<Product[]>([
    {
      id: 1,
      title: 'Elephant',
      quantity: 10,
      price: 1000000,
      description:
        'Elephants are the largest living land animals. ',
    },
    {
      id: 2,
      title: 'Giraffe',
      quantity: 15,
      price: 600000,
      description:
        'The giraffe is a large African hoofed mammal',
    },
  ]);
  cart = signal<Cart[]>([]);
  color = computed(() => (this.totalPrice() > 600000 ? 'green' : 'red'));

  constructor() {
    // Used in Logging data being displayed and when it changes
    effect(() => console.log(JSON.stringify(this.totalPrice())));
  }

  quantitySelected(qty: number) {
    this.quantity.set(Number(qty));
  }

  addToCart(product: Product, index: number): void {
    if (this.quantity() === 0) this.quantity.set(1);
    this.totalQuantity.update((qty) => qty + this.quantity());
    this.totalPrice.update((price) => price + this.quantity() * product.price);
    this.products.mutate(
      (product) => (product[index].quantity = product[index].quantity - this.quantity())
    );
    this.cart.mutate((value) =>
      value.push({
        id: product.id,
        name: product.title,
        qty: this.quantity(),
        price: product.price,
      })
    );
    this.quantity.set(0);
  }

  deleteCartItem(index: number) {
    this.cart.mutate((v) => v.splice(index, 1));
  }
}


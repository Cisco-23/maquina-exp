import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  COINS,
  CollectedProducts,
  Machine,
  MACHINES,
  Product,
  PRODUCTS_DRINKS,
  PRODUCTS_SNACKS,
} from '../model/product.data';
@Injectable({
  providedIn: 'root',
})
export class MachineService {
  private machines: Machine[] = MACHINES;
  private productsDrinks: Product[] = PRODUCTS_DRINKS;
  private productsSnacks: Product[] = PRODUCTS_SNACKS;
  private productsUser: CollectedProducts[] = [];
  private coins: number[] = COINS;

  addCoin(id: number, coin: number) {
    let machine = this.machines.find((m) => m.id === id);
    if (machine) {
      machine.balance += coin;
    } else {
      throw new Error('No existe esta maquina.');
    }
  }

  returnChange(id: number) {
    let machine = this.machines.find((m) => m.id === id);
    if (machine) {
      machine.change = machine.balance;
      machine.balance = 0;
    } else {
      throw new Error('No existe esta maquina.');
    }
  }

  selectProduct(idMach: number, product: Product) {
    const machine = this.machines.find((m) => m.id === idMach);

    if (!machine) {
      throw new Error('No existe esta maquina.');
    }

    if (machine.balance < product.price) {
      throw new Error('Saldo insuficiente.');
    }

    if (product.stock === 0) {
      throw new Error('Producto sin stock.');
    }

    product.stock--;
    machine.balance -= product.price;

    const find = this.productsUser.find(
      (p) => p.name === product.name && p.idMachine === machine.id
    );

    if (find) {
      find.amount++;
    } else {
      this.productsUser.push({ idMachine: machine.id, amount: 1, name: product.name });
    }
  }

  collectProductes(id: number) {
    const machine = this.machines.find((m) => m.id === id);

    if (!machine) {
      throw new Error('No existe esta maquina para recoger los productos.');
    }

    const products = this.productsUser.filter((p) => p.idMachine != id);

    this.productsUser = products;
    machine.change = machine.balance;
    machine.balance = 0;
  }

  getByIdMachine(id: number): Machine {
    const machine = this.machines.find((m) => m.id === id);
    if (!machine) {
      throw new Error('No existe el ID de esta maquina');
    }
    return machine;
  }

  getBalance(id: number) {
    const machine = this.machines.find((m) => m.id === id);

    if (!machine) {
      throw new Error('No existe esta maquina para devolver el saldo.');
    }
    return machine.balance;
  }

  getChange(id: number) {
    const machine = this.machines.find((m) => m.id === id);

    if (!machine) {
      throw new Error('No existe esta maquina para devovler el cambio.');
    }
    return machine.change;
  }

  getProductsDrink(): Observable<Product[]> {
    return of(this.productsDrinks);
  }

  getProductSnacks(): Observable<Product[]> {
    return of(this.productsSnacks);
  }

  getCoins(): Observable<number[]> {
    return of(this.coins);
  }

  getProductsUser(): Observable<CollectedProducts[]> {
    return of(this.productsUser);
  }
}

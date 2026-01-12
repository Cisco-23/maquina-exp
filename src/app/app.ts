import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineService } from './services/machine.service';
import { CollectedProducts, Machine, Product } from './model/product.data';
import { Button, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Button, TableModule, ButtonModule, CardModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly machineService = inject(MachineService);

  productsFilter = signal<CollectedProducts[]>([]);
  productsDrinks = signal<Product[]>([]);
  productsSnacks = signal<Product[]>([]);
  productsUsuari = signal<CollectedProducts[]>([]);
  coins = signal<number[]>([]);

  ngOnInit() {
    this.loadCoins();
    this.loadProductsDrink();
    this.loadProductsSnacks();
    this.loadProductsUsers();
  }

  loadProductsUsers() {
    this.machineService.getProductsUser().subscribe((product) => {
      this.productsUsuari.set(product);
    });
  }

  loadCoins() {
    this.machineService.getCoins().subscribe((c) => {
      this.coins.set(c);
    });
  }

  loadProductsDrink() {
    this.machineService.getProductsDrink().subscribe((product) => {
      this.productsDrinks.set(product);
    });
  }

  loadProductsSnacks() {
    this.machineService.getProductSnacks().subscribe((product) => {
      this.productsSnacks.set(product);
    });
  }

  addCoin(id: number, value: number) {
    this.machineService.addCoin(id, value);
  }

  returnMoney(id: number) {
    this.machineService.returnChange(id);
  }

  selectProduct(idMachine: number, product: Product) {
    this.machineService.selectProduct(idMachine, product);
    console.log(this.productsUsuari());
  }

  collectProduct(id: number) {
    this.machineService.collectProductes(id);
    this.loadProductsUsers();
  }

  getProductsCollectById(id: number): CollectedProducts[] {
    const products = this.productsUsuari().filter((p) => p.idMachine === id);
    return products;
  }
}

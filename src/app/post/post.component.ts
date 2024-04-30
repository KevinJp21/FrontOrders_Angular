import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';  // Importa ReactiveFormsModule y FormControl

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    NgForOf, NgIf,
    ReactiveFormsModule  // Añade ReactiveFormsModule a las importaciones del componente
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  http = inject(HttpClient);
  posts: any = [];
  uniqueCustomers: any = []; // Almacena los clientes únicos
  orders: any = [];
  selectedCustomer = new FormControl('');
  selectedOrder = new FormControl(''); 
  selectedCustomerDetail: any = null; 

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get('http://localhost:3300/customers/')
      .subscribe((posts: any) => {
        this.posts = posts;
        this.filterUniqueCustomers(); // Filtra los clientes para obtener únicos después de obtener los datos
      });
  }

  filterUniqueCustomers() {
    const customerNumbers = new Set();
    const unique: any[] = [];

    this.posts.forEach((customer: { customerNumber: unknown; }) => {
      if (!customerNumbers.has(customer.customerNumber)) {
        customerNumbers.add(customer.customerNumber);
        unique.push(customer);
      }
    });

    this.uniqueCustomers = unique; // Asigna a la propiedad uniqueCustomers los clientes sin duplicar
  }

  loadOrdersForCustomer() {
    if (!this.selectedCustomer.value) {
      console.log("No se ha seleccionado ningún cliente.");
      return;
    }
    this.http.get(`http://localhost:3300/ordersCustomers/${this.selectedCustomer.value}`)
      .subscribe((orders: any) => {
        this.orders = orders;
      });
  }

  loadCustomerInfo() {
    if (!this.selectedOrder.value) {
      console.log("No se ha seleccionado ninguna orden.");
      return;
    }

    const order = this.orders.find((o: any) => `${o.orderNumber}` === `${this.selectedOrder.value}`);
    if (order) {
      this.selectedCustomerDetail = this.posts.find((c: any) =>
        `${c.orderNumber}` === `${order.orderNumber}` && `${c.customerNumber}` === `${order.customerNumber}`);
      console.log(this.selectedCustomerDetail)
      if (!this.selectedCustomerDetail) {
        console.log("No se encontraron detalles del cliente para la orden seleccionada.");
      }
    } else {
      console.log("No se encontró la orden seleccionada.");
    }
  }
}
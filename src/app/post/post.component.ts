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
  orders: any = [];
  selectedCustomer = new FormControl('');
  selectedOrder = new FormControl(''); 
  selectedCustomerDetail: any = null; 

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get('http://localhost:3300/customers')
      .subscribe((posts: any) => {
        this.posts = posts;
      });
  }

  loadOrdersForCustomer() {
    if (!this.selectedCustomer.value) {
      console.log("No se ha seleccionado ningún cliente.");
      return;
    }
    this.http.get(`http://localhost:3300/ordersCustomers/${this.selectedCustomer.value}`)  // Asegúrate de que la URL sea correcta
      .subscribe((orders: any) => {
        this.orders = orders;
      });
  }
}
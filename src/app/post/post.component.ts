import { NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';  // Importa ReactiveFormsModule y FormControl

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule  // Añade ReactiveFormsModule a las importaciones del componente
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  http = inject(HttpClient);
  posts: any = [];
  selectedCustomer = new FormControl('');  // Control para el formulario

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
    console.log("Selected customer number:", this.selectedCustomer.value);
    // Resto del código aquí
  }
}
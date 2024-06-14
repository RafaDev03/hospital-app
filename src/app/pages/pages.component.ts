import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ModalImgComponent } from '../components/modal-img/modal-img.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    ModalImgComponent,
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css',
})
export class PagesComponent implements OnInit {
  ngOnInit(): void {
    this.getUsuarios().then((usuarios) => console.log('Usuarios', usuarios));
    /* const promise = new Promise((resolve, reject) => {
      if (false) {
        resolve('Hello world');
      } else {
        reject('Algo salio mal');
      }
    });
    promise
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => console.log('Error en mi promesa', error));
    console.log('Fin del init'); */
  }
  getUsuarios() {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });
  }
}

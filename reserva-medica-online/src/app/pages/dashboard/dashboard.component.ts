import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf]
})
export class DashboardComponent implements OnInit {
  saludo: string = '';
  mostrarSaludo: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const nombre = localStorage.getItem('nombre');
    const apellido = localStorage.getItem('apellido');

    const currentUrl = this.router.url;
    this.mostrarSaludo = currentUrl === '/dashboard';

    if (this.mostrarSaludo && nombre && apellido) {
      this.saludo = `Hola, ${nombre} ${apellido}`;
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const nav = event as NavigationEnd;
        this.mostrarSaludo = nav.url === '/dashboard' || nav.urlAfterRedirects === '/dashboard';
        if (this.mostrarSaludo && nombre && apellido) {
          this.saludo = `Hola, ${nombre} ${apellido}`;
        }
      });
  }
}

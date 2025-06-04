import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NgIf, NgFor]
})
export class DashboardComponent implements OnInit {
  saludo: string = '';
  mostrarSaludo: boolean = false;
  turnosFuturos: any[] = [];
  tieneTurnos: boolean = false;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    const nombre = localStorage.getItem('nombre');
    const apellido = localStorage.getItem('apellido');
    const currentUrl = this.router.url;

    this.mostrarSaludo = currentUrl === '/dashboard';

    if (this.mostrarSaludo && nombre && apellido) {
      this.saludo = `Hola, ${nombre} ${apellido}`;
      this.obtenerTurnosDesdeAPI();
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const nav = event as NavigationEnd;
        this.mostrarSaludo = nav.url === '/dashboard' || nav.urlAfterRedirects === '/dashboard';
        if (this.mostrarSaludo && nombre && apellido) {
          this.saludo = `Hola, ${nombre} ${apellido}`;
          this.obtenerTurnosDesdeAPI();
        }
      });
  }

  obtenerTurnosDesdeAPI(): void {
    const id_cliente = localStorage.getItem('id_user_id');
    if (!id_cliente) {
      console.error('ID de usuario no encontrado en localStorage');
      return;
    }

    this.apiService.lista_turnos_usuario(id_cliente).subscribe({
      next: (turnos: any[]) => {
        const hoy = new Date();
        this.turnosFuturos = turnos.filter(t => new Date(t.fecha_turno) >= hoy);
        this.tieneTurnos = this.turnosFuturos.length > 0;
      },
      error: (err) => {
        console.error('Error al obtener turnos desde la API:', err);
        this.turnosFuturos = [];
        this.tieneTurnos = false;
      }
    });
  }
}

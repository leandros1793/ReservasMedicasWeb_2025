import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  turnos: any[] = [];

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    this.turnos = this.carritoService.obtenerTurnos();
  }

  irATurnos(): void {
    this.router.navigate(['/turnos']);
  }

  eliminarTurno(index: number): void {
    this.carritoService.eliminarTurno(index);
    this.cargarTurnos(); // Recarga después de eliminar
  }

  limpiarCarrito(): void {
    this.carritoService.limpiarCarrito();
    this.cargarTurnos();
  }
}

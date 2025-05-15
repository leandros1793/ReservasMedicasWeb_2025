import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { TurnosService } from '../../services/turnos.service';
import { PasarelaPagoService } from '../pasarela-pago/pasarela-pago.service'; // ✅ Importá el servicio nuevo

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  turnos: any[] = [];
  turnosConDetalles: any[] = [];

  especialidadesList: any[] = [];
  profesionalesList: any[] = [];

  constructor(
    private carritoService: CarritoService,
    private turnosService: TurnosService,
    private pasarelaPago: PasarelaPagoService, // ✅ Inyectá el servicio de Stripe
    private router: Router
  ) {}

  ngOnInit(): void {
    this.turnosService.obtenerEspecialidades().subscribe((esp) => {
      this.especialidadesList = esp;

      this.turnosService.obtenerProfesionales().subscribe((prof) => {
        this.profesionalesList = prof;

        this.cargarTurnos();
      });
    });
  }

  cargarTurnos(): void {
    this.turnos = this.carritoService.obtenerTurnos();

    this.turnosConDetalles = this.turnos.map(t => {
      const especialidadNombre = this.especialidadesList.find(e => e.id === +t.especialidad)?.nombre || 'Desconocido';
      const profesionalNombre = this.profesionalesList.find(p => p.id === +t.profesional)?.nombre || 'Desconocido';

      return {
        ...t,
        especialidadNombre,
        profesionalNombre,
        precio: 7600 // Podés hacerlo dinámico más adelante
      };
    });
  }

  irATurnos(): void {
    this.router.navigate(['/turnos']);
  }

  eliminarTurno(index: number): void {
    this.carritoService.eliminarTurno(index);
    this.cargarTurnos();
  }

  limpiarCarrito(): void {
    this.carritoService.limpiarCarrito();
    this.cargarTurnos();
  }

  irAPagar(): void {
    const items = this.turnosConDetalles.map(t => ({
      title: `${t.especialidadNombre} - ${t.profesionalNombre}`,
      image: 'https://via.placeholder.com/150', // Reemplazá por imágenes reales si tenés
      price: t.precio
    }));

    this.pasarelaPago.onProceedToPay(items); // ✅ Usás el servicio centralizado
  }
}

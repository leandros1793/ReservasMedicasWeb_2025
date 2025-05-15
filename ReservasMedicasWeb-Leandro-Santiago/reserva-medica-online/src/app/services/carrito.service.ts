// src/app/services/carrito.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private storageKey = 'carrito_turnos';

  constructor() {}

  agregarTurno(turno: any): void {
    const turnos = this.obtenerTurnos();
    turnos.push(turno);
    localStorage.setItem(this.storageKey, JSON.stringify(turnos));
  }

  obtenerTurnos(): any[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  eliminarTurno(index: number): void {
    const turnos = this.obtenerTurnos();
    turnos.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(turnos));
  }

  limpiarCarrito(): void {
    localStorage.removeItem(this.storageKey);
  }
}

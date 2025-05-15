import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private turnos: any[] = [];

  constructor() {
    const data = localStorage.getItem('carritoTurnos');
    if (data) {
      this.turnos = JSON.parse(data);
    }
  }

  agregarTurno(turno: any) {
    this.turnos.push(turno);
    this.guardarEnLocalStorage();
  }

  obtenerTurnos(): any[] {
    return this.turnos;
  }

  eliminarTurno(index: number) {
    if (index >= 0 && index < this.turnos.length) {
      this.turnos.splice(index, 1);
      this.guardarEnLocalStorage();
    }
  }

  limpiarCarrito() {
    this.turnos = [];
    this.guardarEnLocalStorage();
  }

  private guardarEnLocalStorage() {
    localStorage.setItem('carritoTurnos', JSON.stringify(this.turnos));
  }
}

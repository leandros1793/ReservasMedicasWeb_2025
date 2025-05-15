import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment'; // ajustá la ruta según tu proyecto

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private turnos: any[] = [];

  constructor(private http: HttpClient) {
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

  crearSesionPago(turnoData: any): Observable<{ url: string }> {
    // Usamos la URL del backend del environment
    const urlBackend = `${environment.serverURL}/create-checkout-session`;

    return this.http.post<{ url: string }>(urlBackend, turnoData);
  }
}

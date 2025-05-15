import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../interfaces/turno';
import { Especialidad } from '../interfaces/especialidad';
import { Profesional } from '../interfaces/profesional';


@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private apiUrl = 'https://reservasmedicas.ddns.net/lista_turnos_usuario/'; // URL base de la API
  private apiUrl1 = 'https://reservasmedicas.ddns.net/api/v1/';
 // private apiUrl2 = 'https://reservasmedicas.ddns.net/api/v1/';
  // turno={
  //   id:0,
  //   especialidad:"",
  //   profesional:"",
  //   fecha: "",
  //   hora: "",
  //   obraSocial:"",
  // }
  // turno: Turno[]=[]

  // API_URI="http://localhost:4200/turnos"
  // private turnos: any[] = [];

  // constructor(private http: HttpClient) {}

  // agregarTurno(turno: Turno): Observable<any> {
  //   // this.turnos.push(turno);
  //   return this.http.post<any>(`${this.API_URI}/agregarTurno`, turno);
  // }

  // obtenerTurnos() {
  //   return this.turnos;
  // }

  constructor(private http: HttpClient) { }

  obtenerEspecialidades(): Observable<any[]> {
    return this.http.get<Especialidad[]>(`${this.apiUrl1}especialidad/`);
  }

  obtenerProfesionales(): Observable<any[]> {
    return this.http.get<Profesional[]>(`${this.apiUrl1}profesionales/`);
  }
//traer profesionales segun especialidad seleccionada
  getProfesionalesPorEspecialidad(especialidadId: number): Observable<any[]> {
    const url = `https://reservasmedicas.ddns.net/api/v1/profesionales/?especialidad=${especialidadId}`;
    return this.http.get<any[]>(url);
  }

}

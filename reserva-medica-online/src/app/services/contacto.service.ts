import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  private apiUrl = "http://reservasmedicas.ddns.net/api/v1/";
  constructor(private http: HttpClient) {}

  enviarConsulta(datos: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}contacto/`, datos);
}

}
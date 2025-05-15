import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TurnosService } from '../../../services/turnos.service';
import { RouterLink } from '@angular/router';
import { Turno } from '../../../interfaces/turno';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, FormsModule],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css'
})
export class MisTurnosComponent implements OnInit {
    turnos: Turno[] = [];
  
    constructor(private turnosService: TurnosService, private apiService: ApiService) { }
  
    ngOnInit(): void {
      let username = localStorage.getItem('dni');
      let id_cliente = localStorage.getItem('id_user_id');
      console.log('ID de usuario obtenido del localStorage:', id_cliente);
      if (id_cliente) {
        this.apiService.lista_turnos_usuario(id_cliente).subscribe(
          (data: Turno[]) => {
            this.turnos = data;
            console.log('Turnos del usuario:', this.turnos);
          },
          error => {
            console.log('ID de usuario obtenido del localStorage:', id_cliente);
            console.error('Error al obtener los turnos del usuario', error);
          }
        );


      } else {
        console.error('Username no encontrado en localStorage');
      }
    }

    eliminarTurno(turnoId: number): void {
      if (confirm('¿Estás seguro que querés eliminar este turno?')) {
        this.apiService.eliminarTurno(turnoId).subscribe({
          next: () => {
            alert('Turno eliminado con éxito');
            this.turnos = this.turnos.filter(t => t.id !== turnoId); // actualiza la lista
          },
          error: (error) => {
            console.error('Error al eliminar el turno:', error);
            alert('Hubo un error al eliminar el turno');
          }
        });
      }
      console.log()
    }

    


  }
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive, FormsModule],
templateUrl: './iniciar-sesion.component.html',
styleUrls: ['./iniciar-sesion.component.css']

})
export class IniciarSesionComponent implements OnInit {
  loginForm: FormGroup;
  userLoginOn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^[\d]{1,3}\.?[0-9]{3,3}\.?[\d]{3,3}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&@])\S{8,20}$/)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.loginForm.valid) {
      const { dni, password } = this.loginForm.value;

      // 💻 LOGIN HARDCODEADO PARA PRUEBAS
      if (dni === '20736819' && password === 'Prueba123*') {
        console.warn('LOGIN HARDCODEADO ACTIVADO ✅');

        localStorage.setItem('token', 'fake-token-123456');
        localStorage.setItem('id_user_id', '999');
        localStorage.setItem('dni', dni);
        localStorage.setItem('nombre', 'Matias');
        localStorage.setItem('apellido', 'Sorrentino');
        localStorage.setItem('email', 'matias@fake.com');

        const inputUsuario = document.getElementById('input_usuario') as HTMLInputElement;
        if (inputUsuario) {
          inputUsuario.value = `Bienvenido : Matias Sorrentino`;
          inputUsuario.style.display = 'flex';
        }

        this.loginForm.reset();
        this.router.navigate(['/servicios']);
        return;
      }

      // 🔁 LOGIN REAL DESDE LA API
      this.apiService.login(dni, password).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('id_user_id', response.user.id.toString());
          
          localStorage.setItem('dni', response.user.username);
          localStorage.setItem('nombre', response.user.first_name);
          localStorage.setItem('apellido', response.user.last_name);
          localStorage.setItem('email', response.user.email);

          const inputUsuario = document.getElementById('input_usuario') as HTMLInputElement;
          if (inputUsuario) {
            inputUsuario.value = `Bienvenido : ${response.user.first_name} ${response.user.last_name}`;
            inputUsuario.style.display = 'flex';
          }

          this.loginForm.reset();
          this.router.navigate(['/servicios']);
        },
        error => {
          console.error('Error de login', error);
          alert('DNI o contraseña incorrecta.');
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get Dni() {
    return this.loginForm.get("dni");
  }

  get Password() {
    return this.loginForm.get("password");
  }
}

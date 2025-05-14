import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactoForm: FormGroup;
  consultaEnviada: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactoService: ContactoService,
    private router: Router
  ) {
    this.contactoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, this.nameValidator()]],
      apellido: ['', [Validators.required, this.apellidoValidator()]],
      email: ['', [Validators.required, this.emailValidator()]],
      tipoConsulta: ['', Validators.required],
      mensaje: ['', [Validators.required, this.mensajeValidator()]],
      aviso: [false, Validators.requiredTrue]
    });
  }

  // Validación para el apellido (solo letras)
  apellidoValidator() {
    return (control: any) => {
      const isValid = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{2,}$/.test(control.value);
      return isValid ? null : { invalidName: true };
    };
  }

  // Validación para el nombre (solo letras)
  nameValidator() {
    return (control: any) => {
      const isValid = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{2,}$/.test(control.value);
      return isValid ? null : { invalidName: true };
    };
  }

  // Validación para el email
  emailValidator() {
    return (control: any) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(control.value) ? null : { invalidEmail: true };
    };
  }

  // Validación para el mensaje (solo caracteres permitidos)
  mensajeValidator() {
    return (control: any) => {
      const value = control.value?.trim();
      const mensajePattern = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s.,!?()-]*$/;
      return mensajePattern.test(value) ? null : { invalidMensaje: true };
    };
  }

  // Método para enviar el formulario
  enviar() {
    if (this.contactoForm.invalid) {
      return;
    }

    // Conversión de 'tipoConsulta' a número o string dependiendo de la necesidad del backend
    const tipoConsultaValue = this.contactoForm.value.tipoConsulta === 'sugerencia'
      ? 1
      : (this.contactoForm.value.tipoConsulta === 'reclamo' ? 2 : null);

    // Datos que se enviarán al backend
    const contactoData = {
      nombre: this.contactoForm.value.nombre,
      apellido: this.contactoForm.value.apellido,
      correo: this.contactoForm.value.email,
      tipo_de_consulta: tipoConsultaValue,
      mensaje: this.contactoForm.value.mensaje,
      aviso: this.contactoForm.value.aviso
    };

    console.log(contactoData);

    // Enviar la consulta al servicio
    this.contactoService.enviarConsulta(contactoData).subscribe({
      next: (response: any) => {
        console.log('Consulta enviada correctamente:', response);
        this.consultaEnviada = true;

        // Resetear el formulario después de un tiempo
        setTimeout(() => {
          this.consultaEnviada = false;
        }, 5000);
      },
      error: (error: any) => {
        console.error('Error al enviar la consulta:', error);
        this.consultaEnviada = false;
      }
    });

    // Resetear el formulario
    this.contactoForm.reset({
      nombre: '',
      apellido: '',
      email: '',
      tipoConsulta: '',  // Aquí el valor de tipoConsulta también se resetea
      mensaje: '',
      aviso: false
    });
  }
}

  
    

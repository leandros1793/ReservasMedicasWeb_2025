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

  constructor(private formBuilder: FormBuilder, private contactoService: ContactoService, private router: Router) { 
    this.contactoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, this.nameValidator()]],
      apellido: ['', [Validators.required, this.apellidoValidator()]],
      email: ['', [Validators.required, this.emailValidator()]],
      tipoConsulta: ['', Validators.required],
      mensaje: ['', [Validators.required, this.mensajeValidator()]],
      aviso: [false, Validators.requiredTrue]
    });
  }

  apellidoValidator() {
    return (control: any) => {
      const isValid = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{2,}$/.test(control.value);
      return isValid ? null : { invalidName: true };
    };
  }

  nameValidator() {
    return (control: any) => {
      const isValid = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{2,}$/.test(control.value);
      return isValid ? null : { invalidName: true };
    };
  }

  emailValidator() {
    return (control: any) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(control.value) ? null : { invalidEmail: true };
    };
  }

  mensajeValidator() {
    return (control: any) => {
      const value = control.value?.trim();
      const mensajePattern = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s.,!?()-]*$/;
  
      return mensajePattern.test(value)
        ? null
        : { invalidMensaje: true };
    };
  }
  
  
  consultaEnviada: boolean = false;

  enviar() {
    if (this.contactoForm.invalid) {
      return;
    }
  
    const contactoData = {
    nombre: this.contactoForm.value.nombre,
    apellido: this.contactoForm.value.apellido,
    correo: this.contactoForm.value.email, 
    tipo_de_consulta: this.contactoForm.value.tipoConsulta, 
    mensaje: this.contactoForm.value.mensaje,
    aviso: true 
};

    console.log(contactoData);
 
    this.contactoService.enviarConsulta(contactoData).subscribe({
      next: (response: any) => {
        console.log('Consulta enviada correctamente:', response);
        this.consultaEnviada = true;
  
        setTimeout(() => {
          this.consultaEnviada = false;
        }, 5000);
      },
      error: (error: any) => {
        console.error('Error al enviar la consulta:', error);
        this.consultaEnviada = false;
      }
    });
  
    this.contactoForm.reset();
  }
    
}


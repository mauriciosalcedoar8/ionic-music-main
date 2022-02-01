import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = "";
  validation_messages = {
    email: [
      { type: "required", message: "El email es obligatorio!" },
      { type: "pattern", message: "Email invalido, rectifiquelo" }
    ],
    password: [
      { type: "required", message: "Por Favor ingrese una Contraseña"},
      { type: "minlength", message: "Su contraseña debe ser al menos 6 caracteres" },
      { type: "maxlength", message: "Su contraseña debe ser maximo de 9 caracteres" }/* validaciones*/
    ],
    nombre: [
      { type: "required", message: "El email es obligatorio!" },
      { type: "maxlength", message: "Su nombre debe ser maximo de 25 caracteres" }/* validaciones*/
    ],
    apellido: [
      { type: "required", message: "El email es obligatorio!" },
      { type: "maxlength", message: "Su apellido debe ser maximo de 25 caracteres" }/* validaciones*/
    ]
  }
  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private storage: Storage,private authService: AuthenticateService) {
    this.storage.create();
    this.registerForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(9)/*agregue esta validacion*/ 
        ])
      ),
      nombre: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(25)/*agregue esta validacion*/
        ])
      ),
      apellido: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(25)/*agregue esta validacion*/
        ])
      )
    });
   }

  ngOnInit() {
  }

  register(registerData){
    
    this.authService.registerUser(registerData).then(()=> {
      this.navCtrl.navigateBack("/login");
    } );
  }

  goToLogin(){
    this.navCtrl.navigateBack("/login")
  }
}

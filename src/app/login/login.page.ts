import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: "required", message: "El email es obligatorio!" },
      { type: "pattern", message: "Email invalido, rectifiquelo" }
    ],
    password: [
      { type: "required", message: "Por Favor ingrese una Contraseña"},
      { type: "minlength", message: "Su contraseña debe ser al menos 6 caracteres" },
      { type: "maxlength", message: "Su contraseña debe ser maximo de 9 caracteres" }
    ]

  };

  errorMessage: string = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthenticateService, private navCtrl: NavController, private storage: Storage) { 

    this.loginForm = this.formBuilder.group({
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
    )
    
  }
    
    )

  }

  ngOnInit() {
  }

  loginUser(credentials){
    //console.log(credentials);
    this.authService.loginUser(credentials).then(
      res => {
        this.errorMessage = "";
        this.storage.set("isUserLoggedIn", true)
        this.navCtrl.navigateForward("/menu/home");
      }
    ).catch( err => {
      this.errorMessage = err;
    })
  }

  goToRegister(){
    this.navCtrl.navigateForward("/register");
  }

  
}

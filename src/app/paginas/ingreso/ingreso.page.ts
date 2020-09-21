import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  email:string;
  password:string;
  loading:any;
  
  
  constructor(private servicio:AuthService, private router:Router, public alertController: AlertController, 
    private loadingCtrl: LoadingController ) { 
    this.email="";
    this.password="";

    
  }

  ngOnInit() {
  }

  async alertar(mensaje:string){
    const alert= this.alertController.create({
      cssClass: 'danger-alert-btn',
      header: 'Error',
      subHeader: 'Datos mal ingresados',
      message: mensaje,
      buttons: ['OK']
    });

    (await alert).present();
  }

  login2(){
    this.router.navigate(['login']);
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
        message,
        spinner: "bubbles",
        duration: 2500
    });
    return this.loading.present();

    
  }

  login(){
    if(this.password.length>5){
      this.presentLoading('Entrando a la página...');
      this.servicio.loginUser(this.email, this.password).then(res=>{
        this.router.navigate(['home']);
      }).catch(error=>{
        this.alertar("Los datos ingresados no son correctos");      
      });
    }else{
      this.alertar("El password debe tener al menos 6 caracteres."); 
    }
    
  }

  

  carg2(opcion: string){
    switch(opcion){
      case "Invitado":
        this.email="invitado@invitado.com";
        this.password="222222";
        break;
      case "Crear nuevo usuario":
        this.email="";
        this.password="";
        break;
      case "Usuario":
        this.email="usuario@usuario.com";
        this.password="333333";
        break;
      case "Admin":
        this.email="admin@admin.com";
        this.password="111111";
        break;
      case "Tester":
        this.email="tester@tester.com";
        this.password="555555";
        break;
    }
  }

}

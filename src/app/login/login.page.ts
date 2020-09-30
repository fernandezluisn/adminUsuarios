import { Component, OnInit } from '@angular/core';
import {AuthService} from '../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import {BdaService} from '../servicios/bda.service';
import { Usuario } from 'src/clases/usuario';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;
  password2:string;
  perfil:string;
  sexo:string;
  id:number;
  nombre:string;
  apellido:string;
  dni:number;
  perfiles=["Usuario","Admin", "Tester"];
  sexos=["Masculino", "Femenino"];
  data;

  listaUsuarios:Usuario[];
  loading:any;
  
  constructor(private servicio:AuthService, private router:Router, public alertController: AlertController, private bda:BdaService,
    private loadingCtrl:LoadingController, private barcodeScanner: BarcodeScanner ) { 
    this.email="";
    this.password="";
    this.perfil="Usuario";
    this.sexo="Masculino";
    this.nombre="";
    this.apellido="";

    this.bda.devolverListadoUsuarios().subscribe(lista=>{
      this.listaUsuarios=lista;
    })

  }
  

  ngOnInit() {
  }

  escanear(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.data=barcodeData;
     }).catch(err => {
         console.log('Error', err);
     });
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
        message,
        spinner: "bubbles",
        duration: 2500
    });
    return this.loading.present();

    
  }

  async alertar(mensaje:string){
    const alert= this.alertController.create({
      cssClass: 'danger-alert-btn',
      header: 'Error',
      subHeader: 'Subtitle',
      message: mensaje,
      buttons: ['OK']
    });

    (await alert).present();
  }

  login(){
    this.servicio.loginUser(this.email, this.password).then(res=>{
      this.router.navigate(['bienvenida']);
    }).catch(error=>{
      this.alertar(error.message);      
    });
  }

  registrar(){   
      
      if(this.password==this.password2 && this.password.length>5 && this.email.length>10 && this.apellido.length>3 && this.nombre.length>3
        && (this.dni.toString().length==8 || this.dni.toString().length==8)){
        let usu=new Usuario(this.id, this.email, this.perfil, this.sexo, this.nombre, this.apellido, this.dni);
        this.servicio.registrarUsuario(this.email, this.password).then(res=>{
          this.bda.createUsuario(usu).then(res=>{
            this.router.navigate(['bienvenida']);
          });
        
      }).catch(error=>{
        this.alertar("El mail debe tener formato correcto");     
      });      
    }else if(this.password!=this.password2 || this.password.length<6){
      this.alertar("Las contraseñas no coinciden o tienen menos de 6 caracteres");
    }else if(this.nombre.length<4 || this.apellido.length<4){
      this.alertar("El nombre y el apellido deben tener 4 caracteres por lo menos.");
    }
    
  }

  radio(item){
    this.perfil=item;
  }

  cerrar(){
    this.presentLoading("Cerrando");
    this.servicio.logOutUser();    
    this.router.navigate(['ingreso']);
  }

  subir(){
    this.bda.createObjeto(this.data);
  }

}

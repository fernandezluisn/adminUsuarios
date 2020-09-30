import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { element } from 'protractor';
import { Usuario } from 'src/clases/usuario';
import { AuthService } from '../servicios/auth.service';
import { BdaService } from '../servicios/bda.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  esAdmin=false;
  listado:Usuario[];
  user;
  usuarioLogeado:Usuario;
  loading:any;
  anda=false;

  constructor(private bda:BdaService, private service:AuthService, private router:Router, 
    private loadingCtrl: LoadingController ) {  

     
         
      this.service.tomarUsuario().then(element=>{
        this.user=element;
        //console.log(element.email);

        this.bda.devolverListadoUsuarios().subscribe(lista=>{      
          let listaO=this.ordenar(lista);
          this.listado=listaO;
          
          this.listado.forEach(elementF=>{
            if(elementF.correo==this.user.email){
              
              this.usuarioLogeado=elementF;
              if(this.usuarioLogeado.perfil=="Admin"){
                this.esAdmin=true;
                console.log("esAdmin");
              }
              this.anda=true;
            }
          })
          
        })
        
      }) 
        
        
      
      
    
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
        message,
        spinner: "bubbles",
        duration: 2500
    });
    return this.loading.present();

    
  }

  ordenar(lista){
    lista.sort(function (a, b) {
      if (a.apellido > b.apellido) {
        return 1;
      }
      if (a.apellido < b.apellido) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    return lista;
  }

  registrar(){
    this.router.navigate(['login']);
  }

  cerrar(){
    this.presentLoading("Cerrando");
    this.service.logOutUser();    
    this.router.navigate(['ingreso']);
  }

}

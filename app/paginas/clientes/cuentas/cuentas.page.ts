import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/modelos/Cliente';
import { ClientesService } from '../../../servicios/clientes.service';
import { CuentasCliente } from '../../../interfaces/cuentasCliente';
import { AlertController } from '@ionic/angular';
import { Cuenta } from '../../../modelos/cuenta';
import { CuentasService } from 'src/app/servicios/cuentas.service';


@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.page.html',
  styleUrls: ['./cuentas.page.scss'],
})
export class CuentasPage implements OnInit {
  id: any;
  nombre ='';
  cliente = new Cliente();
  cuentasCliente: CuentasCliente[] = [];
  mensaje='';
  cuentaC = new Cuenta();

  constructor(private route: ActivatedRoute,
              private clientesService: ClientesService,
              private alert: AlertController,
              private cuentasService: CuentasService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.refresh();
  }

  refresh(){
    this.clientesService.clienteCuentas(this.id).subscribe(
      res=> {
        if (res.length===0){
          this.mensaje = "No existen cuentas registradas";
        } else {
          this.cuentasCliente = res;
          this.mensaje = `${this.cuentasCliente[0].nombre} ${this.cuentasCliente[0].apellido}`;
        }
      }
    );

  }

  async alerta(titulo: string, subtitulo: string, mensaje: string){
    const alert = await this.alert.create({
   header: titulo,
   subHeader: mensaje,
   buttons: ['ok']
   });
    await alert.present();
 }

   async agregar(){
     let cuentaAgregar = new Cuenta();
     cuentaAgregar.fondo='0';
     cuentaAgregar.cliente_id = this.id;
     const titulo = 'Agregar Cuenta';
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: titulo,
     inputs: [
       {
         name: 'Moneda',
         type: 'text',
         value: cuentaAgregar.moneda,
         placeholder: 'Moneda',
       }
     ],
      buttons: [
        {
          text: 'Canselar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: (data) => {
           cuentaAgregar.moneda = data.Moneda;
           this.cuentasService.postCuenta(cuentaAgregar).subscribe(
             res => {
               console.log(res);
               this.refresh();
               this.alerta('Exito','Crear Cuenta','La cuenta ha sido agregada');
             },
             error =>{
               console.log(cuentaAgregar);
               this.alerta('Error','Crear Cuenta','No se pudo crear la cuenta<br>'+error);
             }
           );
          }
        }
      ]
    });

    await alert.present();
  
}


async editar(cuenta,i){
  const titulo = `Editar Cuenta ${cuenta.cuenta_id}`;
 const alert = await this.alert.create({
   cssClass: 'my-custom-class',
   header: titulo,
  inputs: [
    {
      name: 'Moneda',
      type: 'text',
      value: cuenta.moneda,
      placeholder: 'Moneda',
    }
  ],
   buttons: [
     {
       text: 'Canselar',
       role: 'cancel',
       cssClass: 'secondary',
       handler: (blah) => {
         console.log('Confirm Cancel: blah');
       }
     }, {
       text: 'Confirmar',
       handler: (data) => {
        this.cuentasService.getCuenta(cuenta.cuenta_id).subscribe(
          res=>{
            this.cuentaC = res['data'];
            console.log(this.cuentaC);
            this.cuentaC.moneda = data.Moneda;
            console.log(this.cuentaC);
            this.cuentasService.putCuenta(this.cuentaC).subscribe(
              res => {
                this.cuentasCliente[i].moneda = data.Moneda;
                console.log(res);
              }
            )
          }
        );

       }
     }
   ]
 });

 await alert.present();

}

async eliminar(cuenta,i){
  const titulo = `Peligro!!`;
  const nombre =`${cuenta.nombre} ${cuenta.apellido}`
 const alert = await this.alert.create({
   cssClass: 'my-custom-class',
   header: titulo,
 
   buttons: [
     {
       text: 'Canselar',
       role: 'cancel',
       cssClass: 'secondary',
       handler: (blah) => {
         console.log('Confirm Cancel: blah');
       }
     }, {
       text: 'Confirmar',
       handler: () => {
         this.cuentasService.deleteCuenta(cuenta.cuenta_id).subscribe(
           res =>{
             console.log(res);
             this.cuentasCliente.splice(i,1);
           },
           error => {
             console.log(error);
           }
         );
       }
     }
   ]
 });

 await alert.present();

}

}

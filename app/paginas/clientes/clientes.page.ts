import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Cliente } from 'src/app/modelos/Cliente';
import { ClientesService } from '../../servicios/clientes.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage{
  clientes: Cliente[] = [];
  textoBuscar = '';
  constructor( private clientesService: ClientesService,
                private alertController: AlertController,
                private navController: NavController) { }

  ionViewWillEnter() {
    this.clientes=null;
    this.clientesService.getClientes().subscribe(
    (res: Cliente[]) => {
  //console.log(res);
  this.clientes = res;
  console.log(this.clientes);

      }
    );
  }
  onSerchChange(event){
    this.textoBuscar = event.detail.value;
  }

  agregar(){
    this.navController.navigateForward(['/clientes/gestion',-1]);
  }

  editar(cliente){
   this.navController.navigateForward(['/clientes/gestion',cliente.id]);
  }
  cuentas(cliente){
    this.navController.navigateForward(['/clientes/cuentas',cliente.id]);

  }

  async borrar(cliente,i){
      const nombre = `${cliente.nombre} ${cliente.apellido}`
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Peligro',
        message: `¿Seguro que deseas borrar al cliente?<br><strong>${nombre}</strong>`,
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
              this.clientesService.deleteCliente(cliente.id).subscribe(
                res=> {
                  console.log(res);
                  this.clientes.splice(i,1);
                },
                err=>console.log(err)
              );
            }
          }
        ]
      });
  
      await alert.present();
    
  }

}

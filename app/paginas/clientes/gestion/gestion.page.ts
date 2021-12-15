import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { ClientesService } from '../../../servicios/clientes.service';
import { Cliente } from '../../../modelos/Cliente';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage implements OnInit {
id: any;
titulo='';
cliente: Cliente = new Cliente();
  constructor(   private route: ActivatedRoute,
                 private clienteService: ClientesService,
                 private alert: AlertController,
                 private r: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if(this.id==-1){
      this.titulo = 'Nuevo Cliente';
    }else {
      this.titulo = 'Editar Cliente';
      this.clienteService.showCliente(this.id).subscribe(
        res => {
          this.cliente = res['data'];
          console.log('Cliente',this.cliente);
        }
      );

    }
  }

  async alerta(titulo: string, subtitulo: string, mensaje: string){
   const alert = await this.alert.create({
  header: titulo,
  subHeader: mensaje,
  buttons: ['ok']
  });
await alert.present();
  }

  guardar(){
    let peticion: Observable<any>;
    if (this.cliente.id){
      peticion = this.clienteService.updateCliente(this.cliente);
    } else {
      peticion = this.clienteService.postCliente(this.cliente);
    }
    peticion.subscribe(
      resp => {
        if (this.cliente.id){
          this.alerta ('Modificacion', this.cliente.nombre, 'Modificacion exitosa');
        } else {
          this.alerta ('Alta a usuario', this.cliente.nombre, 'Alta exitosa');
        }
        this.r.navigate(['/clientes']);
      }
    );

  }

}

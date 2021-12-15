import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesPage } from './clientes.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage
  },
  {
    path: 'gestion/:id',
    loadChildren: () => import('./gestion/gestion.module').then( m => m.GestionPageModule)
  },
  {
    path: 'cuentas/:id',
    loadChildren: () => import('./cuentas/cuentas.module').then( m => m.CuentasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPageRoutingModule {}

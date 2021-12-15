import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionPageRoutingModule } from './gestion-routing.module';

import { GestionPage } from './gestion.page';
import { ComponentModule } from '../../../componentes/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionPageRoutingModule,
    ComponentModule
  ],
  declarations: [GestionPage]
})
export class GestionPageModule {}

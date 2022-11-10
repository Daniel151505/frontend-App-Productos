import { NgModule } from '@angular/core';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { LoaderComponent } from './loader/loader.component';
import { AngularMaterialModule } from '../angularMaterial.module';
import { LoaderService } from './loader/loader.service';
import { ConfirmationModalService } from './confirmation-modal/confirmation-modal.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    ConfirmationModalComponent,
    LoaderComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    LoaderService,
    ConfirmationModalService
  ],
  exports: [
    LoaderComponent,
    ConfirmationModalComponent
  ]
})
export class SharedComponentsModule { }

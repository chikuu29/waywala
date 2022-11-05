import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {SkeletonModule} from 'primeng/skeleton';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule,
    ToastModule,
    SkeletonModule
  ],
  exports:[
    FileUploadModule,
    ToastModule,
    SkeletonModule
  ]
})
export class PrimengModule { }

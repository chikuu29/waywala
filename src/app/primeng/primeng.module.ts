import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {SkeletonModule} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule,
    ToastModule,
    SkeletonModule,
    TableModule,
    RatingModule
  ],
  exports:[
    FileUploadModule,
    ToastModule,
    SkeletonModule,
    TableModule,
    RatingModule
  ]
})
export class PrimengModule { }

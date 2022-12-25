import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {SkeletonModule} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {GalleriaModule} from 'primeng/galleria';
import {ImageModule} from 'primeng/image';
import {TooltipModule} from 'primeng/tooltip';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule,
    ToastModule,
    SkeletonModule,
    TableModule,
    RatingModule,
    InputTextareaModule,
    GalleriaModule,
    ImageModule,
    TooltipModule
  ],
  exports:[
    FileUploadModule,
    ToastModule,
    SkeletonModule,
    TableModule,
    RatingModule,
    InputTextareaModule,
    GalleriaModule,
    ImageModule,
    TooltipModule
  ]
})
export class PrimengModule { }

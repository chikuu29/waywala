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
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {BadgeModule} from 'primeng/badge';
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
    TooltipModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    BadgeModule
   
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
    TooltipModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    BadgeModule
  ]
})
export class PrimengModule { }

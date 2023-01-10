import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationRoutingModule } from './education-routing.module';
import { EducationComponent } from './education/education.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesModule } from 'src/app/pages/pages.module';


@NgModule({
  declarations: [
    EducationComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    EducationRoutingModule,
    PagesModule
  ]
})
export class EducationModule { }

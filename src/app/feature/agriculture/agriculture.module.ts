import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgricultureRoutingModule } from './agriculture-routing.module';
import { AgricultureComponent } from './agriculture/agriculture.component';
import { PagesModule } from 'src/app/pages/pages.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MaterialModule } from 'src/app/material/material.module';
import { GenerateQueryComponent } from './generate-query/generate-query.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CheckStatusComponent } from './check-status/check-status.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { MycaseComponent } from './mycase/mycase.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NoDataAvailbleComponent } from 'src/app/shared/no-data-availble/no-data-availble.component';
import { SharedModule } from 'src/app/shared/shared.module';






@NgModule({
    declarations: [
        AgricultureComponent,
        GenerateQueryComponent,
        CheckStatusComponent,
        MycaseComponent,
        FeedbackComponent
        
    ],
    imports: [
        CommonModule,
        AgricultureRoutingModule,
        PagesModule,
        NgxUiLoaderModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        PrimengModule
    ]
})
export class AgricultureModule { }

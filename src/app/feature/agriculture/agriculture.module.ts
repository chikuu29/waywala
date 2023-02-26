import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgricultureRoutingModule } from './agriculture-routing.module';
import { AgricultureComponent } from './agriculture/agriculture.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MaterialModule } from 'src/app/material/material.module';
import { GenerateQueryComponent } from './generate-query/generate-query.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CheckStatusComponent } from './check-status/check-status.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { MycaseComponent } from './mycase/mycase.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { KvksComponent } from './kvks/kvks.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { CustomPipeModule } from 'src/app/customPipe/custom-pipe.module';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { MarketPlaceGraphComponent } from './market-place/market-place-graph/market-place-graph.component';
@NgModule({
    declarations: [
        AgricultureComponent,
        GenerateQueryComponent,
        CheckStatusComponent,
        MycaseComponent,
        FeedbackComponent,
        KvksComponent,
        WeatherForecastComponent,
        MarketPlaceComponent,
        MarketPlaceGraphComponent
    ],
    imports: [
        CommonModule,
        AgricultureRoutingModule,
        NgxUiLoaderModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        PrimengModule,
        CustomPipeModule,

    ],
    exports:[
        MarketPlaceComponent
    ]


})
export class AgricultureModule { }

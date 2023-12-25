import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureConverterPipe } from './temperature-converter.pipe';
import { SpeedMeasurementPipe } from './speed-measurement.pipe';
import { TimeagoPipe } from './timeago.pipe';
import { FillterPipe } from './fillter.pipe';



@NgModule({
  declarations: [
    TemperatureConverterPipe,
    SpeedMeasurementPipe,
    TimeagoPipe,
    FillterPipe

  ],
  imports: [
    CommonModule
  ],
  exports: [TemperatureConverterPipe,SpeedMeasurementPipe,TimeagoPipe,FillterPipe]
})
export class CustomPipeModule { }

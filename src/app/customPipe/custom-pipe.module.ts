import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureConverterPipe } from './temperature-converter.pipe';
import { SpeedMeasurementPipe } from './speed-measurement.pipe';
import { TimeagoPipe } from './timeago.pipe';



@NgModule({
  declarations: [
    TemperatureConverterPipe,
    SpeedMeasurementPipe,
    TimeagoPipe

  ],
  imports: [
    CommonModule
  ],
  exports: [TemperatureConverterPipe,SpeedMeasurementPipe,TimeagoPipe]
})
export class CustomPipeModule { }

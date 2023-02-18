import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureConverterPipe } from './temperature-converter.pipe';
import { SpeedMeasurementPipe } from './speed-measurement.pipe';



@NgModule({
  declarations: [
    TemperatureConverterPipe,
    SpeedMeasurementPipe

  ],
  imports: [
    CommonModule
  ],
  exports: [TemperatureConverterPipe,SpeedMeasurementPipe]
})
export class CustomPipeModule { }

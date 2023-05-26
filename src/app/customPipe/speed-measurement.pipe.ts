import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speedMeasurement'
})
export class SpeedMeasurementPipe implements PipeTransform {

  transform(value: number, unit:string){
    var returnValue:any=0;
    switch(unit){
      case "m/s-km/h":
        // km/h = (m/s) * 3.6
        returnValue=Math.floor(value * 3.6)+" km/h";
        break;
      default:
        break

    }
    return returnValue;
  }

}

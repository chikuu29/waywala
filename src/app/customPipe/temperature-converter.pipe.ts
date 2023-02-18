import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConverter'
})
export class TemperatureConverterPipe implements PipeTransform {

  transform(value: number, unit:string) {
    var returnValue:number=0;
    switch(unit){
      case "K-C":
        returnValue=Math.floor(value-273.15);
        break;
      default:
        break

    }
    return returnValue;
  }

}

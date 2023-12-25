import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'fillter'
})
export class FillterPipe implements PipeTransform {

  transform(data: any[], keys: string[], filterText: string): any[] {
    if (!data || !keys || !filterText) {
      return data; // Return the original data if no data, keys, or filterText is provided
    }
    filterText = filterText.toLowerCase(); // Convert filterText to lowercase for case-insensitive filtering
    // return data.filter(item => {
    //   for (const key of keys) {
    //     const itemValue = item[key];
    //     if (itemValue && itemValue.toString().toLowerCase().includes(filterText)) {
    //       return true; // Return true if any column contains the filter text
    //     }
    //   }
    //   return false; // Return false if no column contains the filter text
    // });
    return _.filter(data, item => {
      return _.some(keys, key => {
        const itemValue = item[key];
        return itemValue && itemValue.toString().toLowerCase().includes(filterText);
      });
    });
  }

}

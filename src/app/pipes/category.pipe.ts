import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(allCommuteCopy:any[], categoryKey:string): any[] {
    const result:any = []
    if(!allCommuteCopy || !categoryKey){
      return allCommuteCopy
    }
    allCommuteCopy.forEach((item)=>{
      if(item.commuteMethod===categoryKey){
        result.push(item)
      }
    })
    return result
  }

}

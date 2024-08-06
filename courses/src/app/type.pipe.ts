import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'type',
  standalone: true
})
export class TypePipe implements PipeTransform {

  transform(kind: number): string {
    let str = "";
    if (kind == 0)
      return str="computer"
    else
      return str="person"

  }
  
}

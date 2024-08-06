import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'learningOptionIcon',
  standalone: true
})
export class LearningOptionIconPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case '0':
        return '/assets/option-learning/0.png';
        case '1':
            return '/assets/option-learning/1.png';
      default:
        return '';
    }
  }

}

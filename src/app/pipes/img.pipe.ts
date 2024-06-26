import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Pipe({
  name: 'img',
  standalone: true,
})
export class ImgPipe implements PipeTransform {
  transform(img: string, tipo: 'users' | 'hospitals' | 'doctors'): string {
    return `${environment.base_url}/uploads/${tipo}/${img}`;
  }
}

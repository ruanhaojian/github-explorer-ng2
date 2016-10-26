import { Pipe, PipeTransform } from '@angular/core';
import * as filesize from 'filesize';

@Pipe({name: 'tranToSize'})
export class TranToSizePipe implements PipeTransform {
    transform(size: string): string {
        if (!size) return '';
        return filesize(size);
    }
}
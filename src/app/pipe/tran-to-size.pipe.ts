import { Pipe, PipeTransform } from '@angular/core';
var filesize = require('filesize');

@Pipe({name: 'transToSize'})
export class TransToSizePipe implements PipeTransform {
    transform(size: string): string {
        if (!size) return '';
        return filesize(size);
    }
}
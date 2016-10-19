import { Component } from '@angular/core';

@Component({
    selector: 'text-holder',
    templateUrl: './text-holder.component.html',
    // styleUrls: ['./text-holder.component.scss'],
    inputs: ['width', 'height', 'center', 'content']
})
export class TextHolderComponent {
    height: string;
    width: string;
    content: string;
    center: boolean;

    constructor() {
        this.content = undefined;
    }

    classObj() : any {
        return {
            'text-holder-wrapper': this.content === undefined,
            center: this.center
        }
    }

    styleObj() : any {
        if (!this.content) {
            return {
                width: this.width,
                height: this.height
            }
        } else {
            return null
        }
    }

}

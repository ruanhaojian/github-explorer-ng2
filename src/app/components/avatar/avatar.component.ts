import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector: 'avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    inputs: ['src']
})
export class AvatarComponent implements OnInit, OnChanges{
    loaded: boolean;
    img: HTMLImageElement;
    src: string;

    constructor(){
        this.loaded = false;
        this.img = null;
    }

    ngOnInit(): void{
        this.loadImg();
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes['src'].currentValue !== changes['src'].previousValue) {
            this.loadImg();
        }
    }

    loadImg(): void{
        this.loaded = false;
        if (this.src) {
            this.img = new Image();
            this.img.onload = () => {
                this.loaded = true;
            };
            this.img.src = this.src;
        }
    }

    changeSrc() : string {
        return `url('${this.src}')`;
    }
}

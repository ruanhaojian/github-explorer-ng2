import { Component, Input, Output, EventEmitter  } from '@angular/core';
import Timer = NodeJS.Timer;

@Component({
    selector: 'search-input',
    templateUrl: './search-input.component.html',
    // styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
    @Input() buttontext : string;
    @Input() placeholder: string;
    @Input() searchtext: string;
    
    @Output() onTextChange = new EventEmitter<string>();
    @Output() onSearch = new EventEmitter<string>();
    @Output() onFocus = new EventEmitter<string>();

    timer: Timer;

    textChange(e) {

        this.onTextChange.emit(e);
        
        // this.timer && clearTimeout(this.timer);
        // this.timer = setTimeout(() => {
        //     this.onSearch.emit();
        // }, 800);
        
    } 
   
}

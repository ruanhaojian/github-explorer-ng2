import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { action } from '../../action/action.service'
import { ACTIONS } from '../../action/action.types'
import { Subscription } from 'rxjs'

@Component({
    selector: 'menu-full-state-handler',
    templateUrl: './menu-full-state-handler.component.html',
    // styleUrls: ['./menu-full-state-handler.component.scss'],
})
export class MenuFullComponent implements AfterViewInit, OnDestroy{
    full: boolean;
    obsFullNavMenu: Subscription;
    obsCloseNavMenu: Subscription;
    
    constructor(){
        this.full = false;
    }
    
    ngAfterViewInit(): void{

        this.obsFullNavMenu = action
            .filter(a => a.name === ACTIONS.FULL_NAV_MENU)
            .subscribe(() => {
                this.full = true;
            });
        this.obsCloseNavMenu = action
            .filter(a => a.name === ACTIONS.CLOSE_NAV_MENU || a.name === ACTIONS.OPEN_NAV_MENU)
            .subscribe(() => {
                this.full = false;
            });
        
    }

    
    ngOnDestroy() : void {

        this.obsFullNavMenu && this.obsFullNavMenu.unsubscribe();
        this.obsCloseNavMenu && this.obsCloseNavMenu.unsubscribe();
        
    }
}

import { Component, Input ,OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-panel',
  templateUrl: './app-sidebar-panel.component.html'
})
export class AppSidebarPanelComponent implements OnInit {
  showElement : boolean;

  constructor() { this.showElement = false }

  ngOnInit() { 
   
  }
    
}

import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ISearchTerm} from "../../models/app-search-model";

@Component({
  moduleId: module.id,
  selector: 'app-search-term',
  templateUrl: './app-search-term.component.html'
})
export class AppSearchTerm implements OnInit {

  @Input() term: ISearchTerm;
  @Output() editSearchTerm: EventEmitter<ISearchTerm> = new EventEmitter<ISearchTerm>();


  constructor() {
  }

  ngOnInit() {
  }

  public onEditClick(): void {
    this.editSearchTerm.emit(this.term);
    console.log('AppSearchTerm');
  }
}

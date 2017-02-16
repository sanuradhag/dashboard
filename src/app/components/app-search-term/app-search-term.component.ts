import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ISearchTerm} from "../../models/app-search-model";

@Component({
  moduleId: module.id,
  selector: 'app-search-term',
  templateUrl: './app-search-term.component.html'
})
export class AppSearchTerm implements OnInit {

  @Input() term: ISearchTerm;
  @Input() index: number;
  @Output() editSearchTerm: EventEmitter<ISearchTerm> = new EventEmitter<ISearchTerm>();
  @Output() deleteSearchTerm: EventEmitter<ISearchTerm> = new EventEmitter<ISearchTerm>();

  public operatorValue: boolean;

  constructor() {
    this.operatorValue = false;

  }

  ngOnInit() {
    this.term.index = this.index;
  }

  public onEditClick(): void {
    this.editSearchTerm.emit(this.term);
  }

  public onDeleteClick(): void {
    this.deleteSearchTerm.emit(this.term);
  }

  public toggleOperator(): void {
    if (this.operatorValue) {
      this.term.logicalOperator.operator = 'AND';
      this.operatorValue = false;
    } else {
      this.term.logicalOperator.operator = 'OR';
      this.operatorValue = true;
    }
  }
}

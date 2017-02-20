import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {ISearchTerm} from "../shared/app-search-model";

@Component({
  moduleId: module.id,
  selector: 'app-search-term',
  templateUrl: './app-search-term.component.html'
})
export class AppSearchTerm implements OnInit,OnChanges {

  public andToggleState: boolean;
  public orToggleState: boolean;
  public toggleState: boolean;

  @Input() term: ISearchTerm;
  @Input() index: number;
  @Output() editSearchTerm: EventEmitter<ISearchTerm> = new EventEmitter<ISearchTerm>();
  @Output() deleteSearchTerm: EventEmitter<ISearchTerm> = new EventEmitter<ISearchTerm>();

  constructor() {
    this.toggleState = true;
  }

  ngOnInit() {
    this.term.index = this.index;
  }

  ngOnChanges() {
    this.andToggleState = this.term.logicalOperator.operator === 'AND'? true: false;
    this.orToggleState = this.term.logicalOperator.operator === 'OR'? true: false;
  }

  /**
   * Event responsible for emitting the search term for updating.
   */
  public onEditClick(): void {
    this.term.logicalOperator.operator = this.andToggleState ? 'AND' : 'OR';
    this.editSearchTerm.emit(this.term);
  }

  /**
   * Event responsible for emitting the search term for deleing.
   */
  public onDeleteClick(): void {
    this.deleteSearchTerm.emit(this.term);
  }

  /**
   * Toggle the AND operator button selected state.
   */
  public toggleANDOperator(): void {
    this.andToggleState = true;
    this.orToggleState = !this.andToggleState;
    this.term.logicalOperator.operator = 'AND';
  }

  /**
   * Toggle the OR operator button selected state.
   */
  public toggleOROperator(): void {
    this.orToggleState = true;
    this.andToggleState = !this.orToggleState;
    this.term.logicalOperator.operator = 'OR';
  }
}

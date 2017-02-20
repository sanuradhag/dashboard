import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash'

import {ITag, ITagValue, IOperator, ISearchTerm} from "../shared/app-search-model";
import {SearchService} from "../shared/app.search.service";

@Component({
  moduleId: module.id,
  selector: 'app-search-query-builder',
  templateUrl: './app-search-term-builder.component.html'
})
/**
 * Class representing the AppSearchTermBuilder component.
 */
export class AppSearchTermBuilder implements OnChanges {

  public filteredTagList: ITag[];
  public filteredTagValueList: ITagValue[];
  public filteredOperatorsList: IOperator[];
  public searchData: ISearchTerm;
  private tagList: ITag[];
  private operatorsList: IOperator[];
  private tagValues: ITagValue[];

  @Input('tags') set tags(tags: ITag[]) {
    this.tagList = tags.slice();
    this.filteredTagList = tags.slice();
  };

  get tags(): ITag[] {
    return this.tagList;
  }

  @Input('operators') set operators(operators: IOperator[]) {
    this.operatorsList = operators;
    this.filteredOperatorsList = operators;
  };

  get operators(): IOperator[] {
    return this.operatorsList;
  }

  @Input() searchTerm: ISearchTerm;
  @Input() isEdit: boolean;
  @Output() setEditState: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() getSearchTerm: EventEmitter<ISearchTerm> = new EventEmitter<ISearchTerm>();
  @Output() updateSearchTerm: EventEmitter<ISearchTerm[]> = new EventEmitter<ISearchTerm[]>();

  constructor(private searchService: SearchService) {
    this.searchData = {
      tag: null,
      operator: null,
      value: null,
      logicalOperator: null,
      index: 0
    };
  }

  ngOnChanges() {
    debugger;
    if (this.isEdit) {
      this.cloneData();
      this.getTagValue(this.searchData.tag.TagID);
    }
  }

  /**
   * This method will be triggered when the tag dropdown's value is changed.
   * @param tag - selected tag from the dropdown.
   */
  public onTagChange(tag: ITag): void {
    if (!tag) {
      return;
    }
    this.getTagValue(tag.TagID);
  }

  /**
   * This method will be triggered when the tag value dropdown's value is changed.
   */
  public onTagValueChange(): void {
    if (this.isEdit || !this.searchData.tag || !this.searchData.value || !this.searchData.operator) {
      return;
    }

    let searchTerm: ISearchTerm = {
      tag: this.searchData.tag,
      operator: this.searchData.operator,
      value: this.searchData.value,
      logicalOperator: {id: 1, operator: 'AND'}
    };
    this.getSearchTerm.emit(searchTerm);
    this.clearData();
  }

  /**
   * This method will be triggered when the tag dropdown filterChange event is fired.
   * @param value
   */
  public handleTagFilter(value) {
    this.filteredTagList = this.tags.filter((tag) => tag.TagName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  /**
   * This method will be triggered when the operator dropdown filterChange event is fired.
   * @param value
   */
  public handleOperatorFilter(value) {
    this.filteredOperatorsList = this.operators.filter((operator) => operator.operator.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  /**
   * This method will be triggered when the tag value dropdown filterChange event is fired.
   * @param value
   */
  public handleTagValueFilter(value) {
    this.filteredTagValueList = this.tagValues.filter((tagValue) => tagValue.Value.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  /**
   * This method is responsible for updating the current search term.
   * It will send the required data to the search componet for the update.
   */
  public onDoneClick(): void {
    if (!this.isEdit || !this.searchData.tag || !this.searchData.value || !this.searchData.operator) {
      return;
    }

    let searchTerm: ISearchTerm = {
      tag: this.searchData.tag,
      operator: this.searchData.operator,
      value: this.searchData.value,
      logicalOperator: this.searchData.logicalOperator
    };
    let array: ISearchTerm[] = [this.searchTerm, searchTerm];
    this.updateSearchTerm.emit(array);

    this.clearData();
    this.setEditState.emit(false);
  }

  /**
   * This method will close the current search term builder.
   */
  public onCloseClick(): void {
    this.searchData ={
      tag: null,
      operator: null,
      value: null,
      logicalOperator: null,
      index: null
    };
    this.setEditState.emit(false);
  }

  /**
   * Responsible for checking weather any fields were changed.
   * @returns {boolean}-  return true if nothing were changed, false if anything was changed.
   */
  public isDoneValid(): boolean {
    let searchTerm: ISearchTerm = {
      tag: this.searchData.tag,
      operator: this.searchData.operator,
      value: this.searchData.value,
      logicalOperator: this.searchData.logicalOperator,
      index: this.searchTerm.index
    };
    return _.isEqual(this.searchTerm, searchTerm);
  }

  /**
   * Responsible for calling the search service to get specific tag data.
   * @param id -  id of the selected tag.
   */
  private getTagValue(id: number): void {
    this.searchService.getTagValue(id).subscribe(
      tagValues => {
        this.tagValues = tagValues;
        this.filteredTagValueList = this.tagValues.slice();
      }
    );

  }

  /**
   * Cloning search term data for for processing.
   */
  private cloneData(): void {
    this.searchData = _.cloneDeep(this.searchTerm);
  }

  /**
   * Clear variables to accept new search term or edit existing one.
   */
  private clearData(): void {
    this.searchData.tag = null;
    this.searchData.operator = null;
    this.searchData.value = null;
    this.searchData.logicalOperator = null;
    this.searchData.index = 0;
    this.tagValues = [];
  }
}

import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash'

import {ITag, ITagValue, IOperator, ISearchTerm} from "../../models/app-search-model";
import {SearchService} from "../../services/app.search.service";

@Component({
  moduleId: module.id,
  selector: 'app-search-query-builder',
  templateUrl: './app-search-query-builder.component.html'
})
/**
 * Class representing the AppSearchQueryBuilder component.
 */
export class AppSearchQueryBuilder implements OnChanges {

  public tagList: ITag[];
  public tagList2: ITag[];
  public tagValueList: ITagValue[];
  public operatorsList: IOperator[];
  public operatorsList2: IOperator[];

  @Input('tags') set tags(tags: ITag[]) {
    this.tagList2 = tags.slice();
    this.tagList = tags.slice();
  };

  get tags(): ITag[] {
    return this.tagList2;
  }

  @Input() set operators(operators: IOperator[]) {
    this.operatorsList2 = operators;
    this.operatorsList = operators;
  };

  get operators(): IOperator[] {
    return this.operatorsList2;
  }

  @Input() searchTerm: ISearchTerm;
  @Input() isEdit: boolean;
  @Output() getSearchTerm: EventEmitter<ISearchTerm> = new EventEmitter<ISearchTerm>();
  @Output() updateSearchTerm: EventEmitter<ISearchTerm[]> = new EventEmitter<ISearchTerm[]>();

  public selectedTag: ITag;
  public selectedTagValue: ITagValue;
  public selectedOperator: IOperator;
  public selectedLogicalOperator: IOperator;
  public tagValues: ITagValue[];


  constructor(private searchService: SearchService) {
  }

  ngOnChanges() {
    if (this.isEdit) {
      this.getTagValue(this.selectedTag.TagID);
      this.cloneData();
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
    if (this.isEdit || !this.selectedTag || !this.selectedTagValue || !this.selectedOperator) {
      return;
    }

    let searchTerm: ISearchTerm = {
      tag: this.selectedTag,
      operator: this.selectedOperator,
      value: this.selectedTagValue,
      logicalOperator: {id: 1, operator: 'AND'}
    };
    this.getSearchTerm.emit(searchTerm);
    this.clearData();
  }

  /**
   * This method will be triggered when the tag dropdown filterChange event is fired
   * @param value
   */
  public handleTagFilter(value) {
    this.tagList = this.tags.filter((tag) => tag.TagName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public handleOperatorFilter(value) {
    this.operatorsList = this.operators.filter((operator) => operator.operator.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public handleTagValueFilter(value) {
    this.tagValueList = this.tagValues.filter((tagValue) => tagValue.Value.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public onDoneClick(): void {
    if (!this.isEdit || !this.selectedTag || !this.selectedTagValue || !this.selectedOperator) {
      return;
    }

    let searchTerm: ISearchTerm = {
      tag: this.selectedTag,
      operator: this.selectedOperator,
      value: this.selectedTagValue,
      logicalOperator: this.selectedLogicalOperator
    };
    let array: ISearchTerm[] = [this.searchTerm, searchTerm];
    this.updateSearchTerm.emit(array);

    this.clearData();
    this.isEdit = false;
  }

  public isDoneValid(): boolean {
    let searchTerm: ISearchTerm = {
      tag: this.selectedTag,
      operator: this.selectedOperator,
      value: this.selectedTagValue,
      logicalOperator: this.selectedLogicalOperator,
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
        this.tagValueList = this.tagValues.slice();
      }
    );

  }

  private cloneData(): void {
    this.selectedTag = this.searchTerm.tag;
    this.selectedTagValue = this.searchTerm.value;
    this.selectedOperator = this.searchTerm.operator;
    this.selectedLogicalOperator = this.searchTerm.logicalOperator;
  }

  private clearData(): void {
    this.selectedTag = null;
    this.selectedTagValue = null;
    this.selectedOperator = null;
    this.selectedLogicalOperator = null;
    this.tagValues = [];
  }
}

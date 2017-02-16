import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';

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

  @Input() tags: ITag[];
  @Input() operators: IOperator[];
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
    this.cloneData();
  }

  ngOnChanges() {
    this.cloneData();
    if(this.isEdit) {
      this.getTagValue(this.selectedTag.TagID);
    }
    console.log('changed');
  }

  /**
   * This method will be triggered when the tag dropdown value is changed.
   * @param tag - selected tag from the dropdown.
   */
  public onTagChange(tag: ITag): void {
    if (!tag) {
      return;
    }
    this.getTagValue(tag.TagID);
  }

  public onTagValueChange(): void {
    if (this.isEdit || !this.selectedTag || !this.selectedTagValue || !this.selectedOperator) {
      return;
    }

    let searchTerm: ISearchTerm = {
      tag: this.selectedTag,
      operator: this.selectedOperator,
      value: this.selectedTagValue,
      logicalOperator: this.selectedLogicalOperator
    };
    this.getSearchTerm.emit(searchTerm);
    this.clearData();
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

  /**
   * Responsible for calling the search service to get specific tag data.
   * @param id -  id of the selected tag.
   */
  private getTagValue(id: number): void {
    this.searchService.getTagValue(id).subscribe(
      tagValues =>
        this.tagValues = tagValues
    );
  }

  private cloneData(): void {
    if (this.isEdit) {
      this.selectedTag = this.searchTerm.tag;
      this.selectedTagValue = this.searchTerm.value;
      this.selectedOperator = this.searchTerm.operator;
      this.selectedLogicalOperator = this.searchTerm.logicalOperator;
    }
  }

  private clearData(): void {
    this.selectedTag = null;
    this.selectedTagValue = null;
    this.selectedOperator = null;
    this.selectedLogicalOperator = null;
    this.tagValues = [];
  }
}

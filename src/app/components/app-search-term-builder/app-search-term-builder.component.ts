import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {ITag, ITagValue, IOperator} from "../../models/app-search-model";
import {SearchService} from "../../services/app.search.service";

@Component({
  moduleId: module.id,
  selector: 'app-search-term-builder',
  templateUrl: './app-search-term-builder.component.html'
})

/**
 * Class representing the AppSearchTermBuilder Component.
 */
export class AppSearchTermBuilder implements OnInit {

  @Input() tags: ITag[];
  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();

  public selectedTag: ITag;
  public selectedTagValue: ITagValue;
  public tagValues: ITagValue[];
  public filter: IOperator;
  public filterArray: IOperator[];

  constructor(private searchService: SearchService) {
    this.filterArray = [
      {
        id: 1,
        operator: '<Equals>'
      },
      {
        id: 2,
        operator: '<Does Not Equal>'
      },
      {
        id: 3,
        operator: '<Begins With>'
      },
      {
        id: 4,
        operator: '<Ends With>'
      },
      {
        id: 4,
        operator: '<Contains>'
      },
      {
        id: 4,
        operator: '<Does Not Contain>'
      }
    ];
  }

  ngOnInit() {
  }

  /**
   * This method will be triggered when the tag dropdown value is changed.
   * @param tag - selected tag from the dropdown.
   */
  public onTagChange(tag: ITag): void {
    if (!tag) {
      return;
    }
    this.getTag(tag.TagID);
  }

  /**
   * This method will be triggered when the tag value dropdown value is changed.
   * @param tag - selected tag from the dropdown.
   */
  public onTagValueChange(tagValue: ITagValue): void {
    if (!tagValue) {
      return;
    }
    this.searchTerm.emit(this.buildSearchTerm());
  }

  /***
   * Removes the current search term from the term list.
   */
  public onCloseClick(): void {
    console.log('asdasdasd');
  }

  /**
   * Responsible for calling the search service to get specific tag data.
   * @param id -  id of the selected tag.
   */
  private getTag(id: number): void {
    this.searchService.getTag(id).subscribe(
      tagValues =>
        this.tagValues = tagValues
    );
  }

  /**
   * Responsible for building the search term.
   */
  private buildSearchTerm(): string {
    if(!this.selectedTag && !this.selectedTagValue && !!this.filter){
      return;
    }
    return `{@@${this.selectedTag.TagName}!!${this.filter.operator}##${this.selectedTagValue.Value}}`
  }

}

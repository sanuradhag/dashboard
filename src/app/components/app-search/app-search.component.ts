import {Component, OnInit} from '@angular/core';
import * as _ from "lodash";

import {SearchService} from "../../services/app.search.service";
import {ITag, ITagValue, IOperator} from "../../models/app-search-model";

@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: './app-search.component.html'
})

/**
 * Class representing an AppSearch.
 */
export class AppSearch implements OnInit {

  public tags: ITag[];
  public count: number;
  public searchTerm: string;

  constructor(private searchService: SearchService) {
    this.tags = [];
    this.count = 1;
    this.searchTerm = '';
  }

  ngOnInit() {
    this.loadTags();
  }

  /**
   * Sending search terms for the service.
   */
  public onSearchClick(): void {

  }

  /**
   * Add a new Search term component to the search term builder component list.
   */
  public onAddNewCondition(): void {
    this.count++;
  }

  public getSearchTerm(data): void {
    this.searchTerm += data;
    console.log('Term' + this.searchTerm);
  }


  /**
   * Responsible for building the search term.
   */
  private buildSearchTerm(): void {

  }

  /**
   * Responsible for calling search service to get all the tags.
   */
  private loadTags(): void {
    this.searchService.getTags()
      .subscribe(
        tags => this.tags = tags,
        err =>
          console.log(err)
      );
  }

  /**
   * Helper function for looping the component.
   * @returns {number[]} -  a number array with n x count number of elements.
   */
  private increaseCount(): number[] {
    let array: number[] = [];
    for(let i = 0; i < this.count; ++i) {
      array.push(i+1)
    }
    return array;
  }


}

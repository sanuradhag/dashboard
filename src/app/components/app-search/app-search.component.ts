import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash'

import {SearchService} from "../../services/app.search.service";
import {ITag, IOperator, ISearchTerm} from "../../models/app-search-model";

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
  public operators: IOperator[];
  public searchTerm: ISearchTerm;
  public searchTerms: ISearchTerm[];
  public isEdit: boolean;

  constructor(private searchService: SearchService) {
    this.tags = [];
    this.operators = [];
    this.searchTerm = null;
    this.searchTerms = [];
    this.isEdit = false;

  }

  ngOnInit() {
    this.loadTags();
    this.loadOperators();
  }

  /**
   * Sending search terms for the service.
   */
  public onSearchClick(): void {

  }

  /**
   * Getting the search term from the search query builder
   * @param data - searchTerm
   */
  public getSearchTerm(searchTerm: ISearchTerm): void {
    this.searchTerms.push(searchTerm);
    console.log(this.searchTerms)
  }

  /**
   *
   * @param searchTerm
   */
  public editSearchTerm(searchTerm: ISearchTerm): void {
    this.isEdit = true;
    this.searchTerm = searchTerm;
    console.log('AppSearch');
  }

  /**
   * Updating a specific search term in the search term list.
   * @param object - this contains the value to be updated and it's previous value.
   */
  public updateSearchTerm(object: ISearchTerm[]): void {
    let index: number = _.findIndex(this.searchTerms, object[0]);
    _.set(this.searchTerms, `[${index}]`, object[1]);
    console.log(this.searchTerms)
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
   * Responsible for calling search service to get all the operators.
   */
  private loadOperators(): void {
    this.searchService.getOperators()
      .subscribe(
        operators => this.operators = operators,
        err =>
          console.log(err)
      );
  }
}

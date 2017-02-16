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
  public searchQuery: string;

  constructor(private searchService: SearchService) {
    this.tags = [];
    this.operators = [];
    this.searchTerm = null;
    this.searchTerms = [];
    this.isEdit = false;
    this.searchQuery = '';

  }

  ngOnInit() {
    this.loadTags();
    this.loadOperators();
  }

  /**
   * Sending search terms for the service.
   */
  public onSearchClick(): void {
    this.searchQuery = this.buildSearchTerm();
  }

  /**
   * Getting the search term from the search query builder
   * @param data - searchTerm
   */
  public getSearchTerm(searchTerm: ISearchTerm): void {
    this.searchTerms.push(searchTerm);
  }

  /**
   *
   * @param searchTerm
   */
  public editSearchTerm(searchTerm: ISearchTerm): void {
    this.isEdit = true;
    this.searchTerm = searchTerm;
  }

  /**
   *
   * @param searchTerm
   */
  public deleteSearchTerm(searchTerm: ISearchTerm): void {
    let index: number = _.findIndex(this.searchTerms, searchTerm);
    this.searchTerms.splice(index,1);
  }

  /**
   * Updating a specific search term in the search term list.
   * @param object - this contains the value to be updated and it's previous value.
   */
  public updateSearchTerm(object: ISearchTerm[]): void {
    let index: number = _.findIndex(this.searchTerms, object[0]);
    _.set(this.searchTerms, `[${index}]`, object[1]);
    this.isEdit = false;
  }

  /**
   * Responsible for building the search term.
   */
  private buildSearchTerm(): string {
    let data: string = '';
    _.each(this.searchTerms, (searchTerm: ISearchTerm, index: number) => {
      let logicalOperator: string = this.searchTerms[index + 1] ? `[${this.searchTerms[index + 1].logicalOperator.operator}]` : '';
      data += `{@@${searchTerm.tag.TagName}!!<${searchTerm.operator.operator}>##${searchTerm.value.Value}}${logicalOperator}`;
    });
    return encodeURI(data);
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

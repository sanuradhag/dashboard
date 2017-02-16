// import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
//
// import {ITag, ITagValue, IOperator} from "../../models/app-search-model";
// import {SearchService} from "../../services/app.search.service";
//
// @Component({
//   moduleId: module.id,
//   selector: 'app-search-term-builder',
//   templateUrl: './app-search-term-builder.component.html'
// })
//
// /**
//  * Class representing the AppSearchTermBuilder Component.
//  */
// export class AppSearchTermBuilder implements OnInit {
//
//   @Input() tags: ITag[];
//   @Output() addNewTerm: EventEmitter<string> = new EventEmitter<string>();
//
//   public selectedTag: ITag;
//   public selectedTagValue: ITagValue;
//   public tagValues: ITagValue[];
//   public filter: IOperator;
//   public filterArray: IOperator[];
//   public conditionOperator: boolean;
//   public conditionOperatorString: string;
//   public showConditionButton: boolean;
//
//   constructor(private searchService: SearchService) {
//     this.filterArray = [
//       {
//         id: 1,
//         operator: '<Equals>'
//       },
//       {
//         id: 2,
//         operator: '<Does Not Equal>'
//       },
//       {
//         id: 3,
//         operator: '<Begins With>'
//       },
//       {
//         id: 4,
//         operator: '<Ends With>'
//       },
//       {
//         id: 4,
//         operator: '<Contains>'
//       },
//       {
//         id: 4,
//         operator: '<Does Not Contain>'
//       }
//     ];
//
//     this.conditionOperator = true;
//     this.showConditionButton = false;
//     this.conditionOperatorString = 'AND';
//   }
//
//   ngOnInit() {
//   }
//
//   /**
//    * This method will be triggered when the tag dropdown value is changed.
//    * @param tag - selected tag from the dropdown.
//    */
//   public onTagChange(tag: ITag): void {
//     if (!tag) {
//       return;
//     }
//     this.getTag(tag.TagID);
//   }
//
//   /**
//    * This method will be triggered when the add new button is clicked.
//    * Will call a method of the parent component using EventEmitter.
//    */
//   public onAddNewTermClick(): void {
//     if (!this.selectedTagValue) {
//       return;
//     }
//     this.addNewTerm.emit();
//     this.showConditionButton = true;
//   }
//
//   /***
//    * Removes the current search term from the term list.
//    */
//   public onCloseClick(): void {
//     console.log('asdasdasd');
//   }
//
//   /**
//    * Change the display text of the button. AND/OR
//    */
//   public toggleButtonState(): void {
//     this.conditionOperator = this.conditionOperator ? false: true;
//     this.conditionOperatorString = this.conditionOperator? 'AND': 'OR';
//     console.log(this.conditionOperatorString);
//   }
//
//   /**
//    * Responsible for calling the search service to get specific tag data.
//    * @param id -  id of the selected tag.
//    */
//   private getTag(id: number): void {
//     this.searchService.getTag(id).subscribe(
//       tagValues =>
//         this.tagValues = tagValues
//     );
//   }
//
//   /**
//    * Responsible for building the search term.
//    */
//   private buildSearchTerm(): string {
//     if(!this.selectedTag && !this.selectedTagValue && !!this.filter){
//       return;
//     }
//     return `{@@${this.selectedTag.TagName}!!${this.filter.operator}##${this.selectedTagValue.Value}}`
//   }
//
// }

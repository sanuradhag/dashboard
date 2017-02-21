import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ITag, IOperator} from "../shared/app-search-model";

export interface ISearchService {
  getTags(): Observable<ITag[]>;
  getTagValue(id: number): Observable<string[]>;
  getOperators(): Observable<IOperator[]>;
}

/**
 * Class representing the search service.
 * Responsible for all search api calls.
 */
@Injectable()
export class SearchService implements ISearchService {

  public getTagsUrl: string;
  public getTagValueUrl: string;
  private apiEndpoint: string;

  constructor(private http: Http) {
    this.apiEndpoint = 'http://10.101.15.169:3334';
    this.getTagsUrl = `${this.apiEndpoint}/tags`;
    this.getTagValueUrl = `${this.apiEndpoint}/tags`;
  }


  public getTags(): Observable<ITag[]> {
    return this.http.get(this.getTagsUrl).map((res: Response) => res.json().tags)
  }

  public getTagValue(id: number): Observable<string[]> {
    return this.http.get(`${this.getTagValueUrl}/${id}/values`)
      .map((res: Response) => res.json().tagValues)
  }

  public getOperators(): Observable<IOperator[]> {

    return this.http.get(``)
      .map((filterArray) => [
        {
          id: 1,
          operator: 'Equals'
        },
        {
          id: 2,
          operator: 'Does Not Equal'
        },
        {
          id: 3,
          operator: 'Begins With'
        },
        {
          id: 4,
          operator: 'Ends With'
        },
        {
          id: 4,
          operator: 'Contains'
        },
        {
          id: 4,
          operator: 'Does Not Contain'
        }
      ])
  }

}

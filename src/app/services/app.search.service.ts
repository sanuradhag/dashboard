import {Injectable, Inject} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ITag, ITagValue} from "../models/app-search-model";

export interface ISearchService {
    getTags(): Observable<ITag[]>;
    getTag(id: number): Observable<ITagValue[]>;
}

/**
 * Class representing the search service.
 * Responsible for all search api calls.
 */
@Injectable()
export class SearchService implements ISearchService{

  public getTagsUrl: string;
  public getTagUrl: string;
  private apiEndpoint: string;

  constructor(private http: Http) {
    this.apiEndpoint = 'http://localhost:3334';
    this.getTagsUrl = `${this.apiEndpoint}/tags`
    this.getTagUrl = `${this.apiEndpoint}/tag`
  }


  public getTags(): Observable<ITag[]> {
      return this.http.get(this.getTagsUrl).
        map((res: Response) => res.json().Tags)
  }

  public getTag(id: number): Observable<ITagValue[]> {
    return this.http.get(`${this.getTagUrl}/${id}`)
      .map((res:Response) => res.json().Values)
  }

}

import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {Observable} from "rxjs";

export abstract class CRUDService<E> {

  protected constructor(protected restDataSource: RestDataSourceService, protected resourceName: string) { }

  delete(id: number): Observable<true> {
    return this.restDataSource.deleteResponseData(this.resourceName, id);
  }

  create(data: E): Observable<E> {
    return this.restDataSource.postResponseData<E>(this.resourceName, data);
  }

  update(data: E): Observable<E> {
    return this.restDataSource.putResponseData<E>(this.resourceName, data);
  }

  get(id: number): Observable<E> {
    return this.restDataSource.getResponseData<E>(`${this.resourceName}/${id}`)
  }
}

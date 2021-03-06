import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Data {
  total_rows: number;
  offset:     number;
  rows:       Row[];
}

export interface Row {
  id:    string;
  key:   string;
  value: Value;
  doc:   Events;
}

export interface Events {
  _id?:                  string;
  _rev?:                 string;
  validate_doc_update?: string;
  language?:            string;
  title?:               string;
  start_time?:          string;
  end_time?:            string;
  location?:            string;
  description?:         string;
}

export interface Value {
  rev: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  dbcouch: string = "https://alf74.alwaysdata.net/data/alf74_agenda_papeteries/";

  all_docs: string = "_all_docs?include_docs=true";

  constructor(private http: HttpClient) {
    
  }

  getAllEvents(): Observable<Events[]> {
    return this.http.get<Data>(this.dbcouch + this.all_docs).pipe(
      map(data => data.rows.map( row => row.doc)),
      catchError(this.handleError('getAllEvents', []))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
}

}

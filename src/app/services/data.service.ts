import { Injectable } from '@angular/core';
import { Ibook } from '../ibook';
import { HttpClient  } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { map,catchError,debounceTime,distinctUntilChanged,switchMap  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  _booksUrl:string = 'https://ngwsbookservice.azurewebsites.net/books';
  // https://ngwsbookservice.azurewebsites.net/books/getbooks

  constructor(private _http: HttpClient) { }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ?   
    `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return observableThrowError(errMsg);
  }

  // getBooks(): Observable<Ibook[]> {
  //   return this._http.get<Ibook[]>(this._booksUrl+"/GetBooks")
  //     .pipe(catchError(this.handleError));
  // }
//commented for applying search functionality
  
search(terms: Observable<string>) {
  return terms
    .pipe(
      debounceTime(400), 
      distinctUntilChanged(), 
      switchMap(term => this.getBooks(term))
    );
}


getBooks(query?: string): Observable<Ibook[]> {
  return this._http.get<Ibook[]>(this._booksUrl+"/GetBooks")
  .pipe(
    map((books:Ibook[]) => {
      if (query != null && query.length > 0) {
        books = books.filter(
          data =>
            data.author.includes(query) ||
            data.title.includes(query)
        )
      }
      return books;
    }),
    catchError(this.handleError)
  );
}

getBook(id: number): Observable<Ibook> {
  return this.getBooks()
  .pipe(
    map((books: Ibook[]) => books.find(b => b.id === id)),
    catchError(this.handleError)
 );
}

getPreviousBookId(id: number): Observable<number> {
  return this.getBooks()
  .pipe(
    map((books: Ibook[]) => {
      return books[Math.max(0, books.findIndex(b => b.id === id) - 1)].id;
    }),
    catchError(this.handleError)
  );
}

getNextBookId(id: number): Observable<number> {
  return this.getBooks()
  .pipe(
    map((books: Ibook[]) => {
      return books[Math.min(books.length - 1, books.findIndex(b => b.id === id) + 1)].id;
    }),
    catchError(this.handleError)
  );
}

updateBook(book: Ibook): Observable<Ibook> {
  return this._http.put<Ibook>(this._booksUrl+"/modifybook", book)
  .pipe(
    catchError(this.handleError)
  );
}

deleteBook(id: number): Observable<{}> {
  return this._http.delete(`${this._booksUrl+"/deletebook"}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
}

getNextId(): Observable<number> {
  return this._http.get<number>(this._booksUrl+"/GetNextId")
    .pipe(catchError(this.handleError));
 }




}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = "PM29qgtbcTDq2Bn2Ujhu3Km3X4VC6eFe";
  private _historial : string[] = [];
  public resultados: Gif[] = [];
  
  constructor(private http: HttpClient ) { }

  get historial(){
      return [...this._historial];
  }

  buscarGifs(query : string){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

    } 

    this.http.get <SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=PM29qgtbcTDq2Bn2Ujhu3Km3X4VC6eFe&q=${query}&limit=10`)
        .subscribe( (resp) => {
          this.resultados = resp.data;
        } );

  }



}

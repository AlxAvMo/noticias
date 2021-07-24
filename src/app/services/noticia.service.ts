import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers= new HttpHeaders({
  'X-Api-key':apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  
  headLinePage=0;
  categoriaActual='';
  categoriaPage=0;

  constructor(private http:HttpClient) {   }

   private ejecutarQuery<T>(query:string){
    query=apiUrl+query;
    return this.http.get<T>(query,{headers});
   }

   getTopHeadLines(){
     this.headLinePage++;
     //return this.http.get<RespuestaTopHeadlines>('http://newsapi.org/v2/top-headlines?country=us&apiKey=cfd2a26663b7457393b35cb6c146d1f7');
     return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headLinePage}`);
   }

   getTopHeadlinesCategorias(categoria:string){
     if(this.categoriaActual===categoria){
       this.categoriaPage++;
     }else{
       this.categoriaPage=1;
       this.categoriaActual=categoria;
     }

    //return this.http.get<RespuestaTopHeadlines>('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=cfd2a26663b7457393b35cb6c146d1f7');
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${ categoria }&page=${this.categoriaPage}`);
   }
}

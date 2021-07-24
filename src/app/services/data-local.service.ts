import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[]=[];

  constructor(private storage: Storage) {
    this.cargarFavoritos();
   }

  guardarNoticia( noticia:Article ){

    const existe= this.noticias.find(noti=>noti.title==noticia.title);
    if(!existe){
      this.noticias.unshift(noticia); //Unshift introduce el elemento al principio del arreglo
      this.storage.set('favoritos',this.noticias);
    }
  }

  async cargarFavoritos(){
    const fav=await this.storage.get('favoritos');
    if(fav){
      this.noticias=fav;
    }
    return
  }

  removerFavorito(noticia:Article){
    this.noticias=this.noticias.filter(noti=>noti.title!==noticia.title);
    this.storage.set('favoritos',this.noticias);
  }

}
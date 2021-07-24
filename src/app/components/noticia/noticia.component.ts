import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';



@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Article;
  @Input() i:number;
  @Input() enFavoritos:boolean;
  
  constructor(private iab:InAppBrowser, 
              private asc: ActionSheetController,
              private socialSharing: SocialSharing,
              private datataLocalService: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia(){
    const browser=this.iab.create(this.noticia.url,'_system');
  }

  async lanzarMenu(){

    let botonFavorito;

    if(this.enFavoritos){
      botonFavorito={
        text: 'Remover Favorito',
        icon: 'close-circle-outline',
        cssClass: 'action-dark',
        handler: () => {
          this.datataLocalService.removerFavorito(this.noticia);
        }
      }
    }else{
      botonFavorito={
        text: 'Favorite',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          this.datataLocalService.guardarNoticia(this.noticia);
        }
      }
    }

    const actionSheet = await this.asc.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(this.noticia.title,
                                  this.noticia.source.name,
                                  '',
                                  this.noticia.url);
        }
      },
      botonFavorito, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
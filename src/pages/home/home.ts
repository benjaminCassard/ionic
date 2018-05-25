import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
// import { Observable } from '@firebase/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  songs: Observable<any[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    private afDatabase: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
    this.songs = afDatabase.list('songs').valueChanges();
  }

  addSong(){
    let prompt = this.alertCtrl.create({
      title: "Song name",
      message: "Enter a name for this new song",
      inputs: [
        // {
        //   id: 'id',
        //   placeholder: 'Id'
        // },
        {
          name: 'title',
          placeholder: 'Title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            // this.afDatabase.database.ref('songs/').set({
            //   id: data.id,
            //   title: data.title
            // });
            const newSongRef = this.afDatabase.list('songs').push({});
            newSongRef.set({
              id: newSongRef.key,
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(songId, songTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do ?',
      buttons: [
        {
          text: 'Delete song',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
          }
        },
        {
          text: 'Update title',
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeSong(songId: string){
    const songsRef = this.afDatabase.list('songs');
    songsRef.remove(songId);
  }

  updateSong(songId, songTitle){
    let prompt = this.alertCtrl.create({
      title: 'Song name',
      message: 'Update the name of the song',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: songTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel cliked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const songsRef = this.afDatabase.list('songs');
            songsRef.update(songId, { title: data.title });
          }
        }
      ]
    });
    prompt.present();
  }

}

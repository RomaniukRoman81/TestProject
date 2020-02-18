import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/database';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailList: AngularFireList<any>;

  constructor(private fireBase: AngularFireDatabase) { }

  getImageDetailList() {
    this.imageDetailList = this.fireBase.list('/Animal');
    console.log('get list images =>', this.imageDetailList);
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }
}

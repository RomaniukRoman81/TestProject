import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/database';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imagesDetailList: AngularFireList<any>;

  constructor(private fireBase: AngularFireDatabase) { }

  getImagesDetailList() {
    this.imagesDetailList = this.fireBase.list('/imageDetailList');
  }

  insertImageDetails(imageDetails) {
    this.imagesDetailList.push(imageDetails);
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/database';
import { Constants } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imagesDetailList: AngularFireList<any>;

  constructor(private fireBase: AngularFireDatabase) { }

  getImagesDetailList() {
    this.imagesDetailList = this.fireBase.list(Constants.fireBase.imageDetailListUrl);
  }

  insertImageDetails(imageDetails) {
    this.imagesDetailList.push(imageDetails);
  }
}

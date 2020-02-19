import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/image.service';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styles: []
})
export class ImageListComponent implements OnInit {
  imagesList: any[];
  rowIndexArray: Array<any>;
  newImage: string = Constants.angularImages.newImage;
  constructor(private imageservice: ImageService) { }

  ngOnInit() {
    this.imageservice.getImagesDetailList();
    this.imageservice.imagesDetailList.snapshotChanges().subscribe(
      list => {
        this.imagesList = list.map(item => item.payload.val());
        this.rowIndexArray = Array.from(Array(Math.ceil((this.imagesList.length + 1) / 3)).keys());
        console.log('list data =>', this.imagesList);
      },
      err => {
        console.log('Error get details list', err);
      }
    );
  }
}

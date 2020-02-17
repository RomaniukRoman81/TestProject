import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: []
})
export class ImageComponent implements OnInit {

  imgSrc = 'http://placehold.jp/24/cccccc/ffffff/250x50.png?text=click here to upload';
  selectedImage: null;
  isSubmitted = false;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit() {
  }

  get formControls() {
    return this.formTemplate.controls;
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
  }

  showPreview(event: any) {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
      console.log('check event=>', event);
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
     } else {
       this.imgSrc = 'http://placehold.jp/24/cccccc/ffffff/250x50.png?text=click here to upload';
       this.selectedImage = null;
     }
  }
}

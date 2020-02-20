import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageService } from 'src/app/shared/image.service';
import { Constants } from 'src/app/constants';
import 'firebase/storage';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: []
})
export class ImageComponent implements OnInit {

  imgSrc: string;
  selectedImage: any;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  });

  constructor(private storage: AngularFireStorage, private imageService: ImageService) { }

  ngOnInit() {
    this.resetForm();
    this.imageService.getImagesDetailList();
  }

  get formControls() {
    return this.formTemplate.controls;
  }

  showPreview(event: any) {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = Constants.angularImages.imgSrcPlaceholder;
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid && this.selectedImage != null) {
      const filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue.imageUrl = url;
            this.imageService.insertImageDetails(formValue);
            this.resetForm();
          });
        })
      ).subscribe();
    }
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl: '',
      category: 'Animal'
    });
    this.imgSrc = Constants.angularImages.imgSrcPlaceholder;
    this.selectedImage = null;
    this.isSubmitted = false;
  }
}

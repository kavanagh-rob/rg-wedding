import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../shared/image.service';
import {ChangeDetectorRef} from '@angular/core';

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: 'image-upload.component.html',
  styleUrls: ['image-upload.component.scss']
})
export class ImageUploadComponent {

  selectedFile: ImageSnippet;

  constructor(private ref: ChangeDetectorRef, private imageService: ImageService) {}

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    this.ref.detectChanges();
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
    this.ref.detectChanges();
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;

      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (data) => this.onSuccess(),
        (error) => this.onError()
      );
    });

    reader.readAsDataURL(file);
  }
}

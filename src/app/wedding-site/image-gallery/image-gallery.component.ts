import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../shared/image.service';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  images;
  s3Url = 'https://rg-wedding-photos.s3-eu-west-1.amazonaws.com/';
  constructor(private ref: ChangeDetectorRef, private imageService: ImageService) {}

  ngOnInit() {
    this.imageService.getImages().subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError()
    );
  }

  getImageUrl(key) {
    return this.s3Url + key;
  }

  private onSuccess(data) {
    this.images = data;
    this.ref.detectChanges();
  }

  private onError() {
  }

}

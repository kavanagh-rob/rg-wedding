import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  region = 'eu-west-1';
  bucketName = 'rg-wedding-photos';
  IdentityPoolId = 'eu-west-1:215a6e77-1989-4dac-a3fc-12613fa9fe47';
  s3: AWS.S3;
  imageLocation;
  bucketPrefix = 'uploads/2019/';

  constructor(private http: HttpClient) {
    AWS.config.update ({
      region: this.region,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this.IdentityPoolId
      })
    });
    this.s3 = this.getS3Config();
  }

  public uploadImage(image: File): Observable<string> {
    return new Observable (observer => {
      const file = image;
      this.imageLocation = this.getFileKey(file.name.toLowerCase());
      this.s3.upload({ Key: this.imageLocation, Bucket: this.bucketName, Body: file, ACL: 'public-read'}, (err, data) => {
        if (err) {
          console.log(err, 'there was an error uploading your file');
          observer.error('there was an error uploading your file');
        }
        observer.next('upload success');
      });
    });
  }

  public getImages(): Observable<AWS.S3.Object[]> {
    return new Observable (observer => {
      this.s3.listObjectsV2({ Bucket: this.bucketName, Prefix: this.bucketPrefix }, (err, data) => {
        if (err ) {
          observer.error('error reading images');
        }
        console.log(data);
        data.Contents.forEach(  (content) => {
          console.log(content.Key);
        });
        observer.next(data.Contents);
      });
    });
  }

  // public getImageContent( imageKey: string ): Observable<AWS.S3.Object[]> {
  //   return new Observable (observer => {
  //     this.s3.getObject({ Bucket: this.bucketName, Key: this.bucketPrefix }, (err, data) => {
  //       if (err ) {
  //         observer.error('error reading image data');
  //       }
  //       console.log(data);
  //       data.Body;
  //       observer.next(data.Contents);
  //     });
  //   });
  // }

  private getFileKey(fileName: string) {
    return this.bucketPrefix + fileName;
  }

  private getS3Config() {
    return new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: this.bucketName}
    });
  }
}


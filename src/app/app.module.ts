import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WeddingSiteComponent } from './wedding-site/wedding-site.component';
import { TopNavComponent } from './wedding-site/top-nav/top-nav.component';
import { ImageUploadComponent } from './wedding-site/image-upload/image-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageGalleryComponent } from './wedding-site/image-gallery/image-gallery.component';

const appRoutes: Routes = [
  {
    path: 'upload',
    component: ImageUploadComponent
  },
  {
    path: 'gallery',
    component: ImageGalleryComponent
  },
  { path: '',
    redirectTo: '/upload',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WeddingSiteComponent,
    TopNavComponent,
    ImageUploadComponent,
    ImageGalleryComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }, // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

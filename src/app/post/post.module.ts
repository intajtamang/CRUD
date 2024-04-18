import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './post.service'; // Ensure correct import path
import { AppComponent } from '../app.component';



@NgModule({
  declarations: [],
  providers: [PostService], // Ensure that PostService is provided
  imports: [
    CommonModule,BrowserModule, HttpClientModule,
  ]

})
export class PostModule { }

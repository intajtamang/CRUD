import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../post.service';
import { Post, ProductObject } from '../post';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];
  currentPage: any;
  totalPages: any;
  pageNumbers: any;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: ProductObject) => {
      this.posts = data.products;
      console.log(data);
    });
  }

  onPageChange(page:number){
    this.postService.getAll().subscribe((data: ProductObject) => {
      this.posts = data.products;
      console.log(data);
    });
  }



}

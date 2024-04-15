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
  limit:number = 30;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: ProductObject) => {
      this.posts = data.products;
      this.totalPages = data.total;//Math.ceil(data.total / data.limit);
      this.pageNumbers =Math.ceil(data.total / data.limit);
      console.log(this.pageNumbers);
      this.currentPage = 1;
      console.log( );
    });
  }

  onPageChange(page:number){
    let skip = (page -1) * this.limit;
    this.currentPage = page;
    this.postService.getAll(skip).subscribe((data: ProductObject) => {
      this.posts = data.products;
      this.pageNumbers = 4;
      // console.log(data);
    });
  }



}

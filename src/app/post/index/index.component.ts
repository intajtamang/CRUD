import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../post.service';
import { Post, ProductObject } from '../post';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  currentPage: any;
  totalPages: any;
  pageNumbers: any;
  limit:number = 30;
  searchTerm: string = '';
  router: any;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAll().subscribe((data: ProductObject) => {
      this.posts = data.products;
      this.totalPages = Math.ceil(data.total / data.limit);
      this.pageNumbers = this.totalPages;
      this.currentPage = 1;
    });
  }

  onPageChange(page:number): void {
    let skip = (page -1) * this.limit;
    this.currentPage = page;
    this.postService.getAll(skip).subscribe((data: ProductObject) => {
      this.posts = data.products;
      // Assuming 4 pages for simplicity, you should calculate this dynamically based on total items
      this.pageNumbers = 4;
    });
  }

  searchProducts(): void {
    if (this.searchTerm.trim() === '') {
      this.loadPosts();
      return;
    }

    this.postService.searchProducts(this.searchTerm).subscribe(
      (data: any) => {
        this.posts = data.products;
        this.totalPages = Math.ceil(data.total / data.limit);
        this.pageNumbers = this.totalPages;
        this.currentPage = 1;
      },
      (error: any) => {
        if (error.status === 404) {
          console.error('Resource not found:', error);
        } else {
          console.error('An error occurred during search:', error);
        }
      }
    );
  }

  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.delete(postId).subscribe({
        next: () => {
          // Remove the deleted post from the local array
          this.posts = this.posts.filter(posts => posts.id !== postId);
          alert('Post Deleted Successfully!');
        },
        error: (error) => {
          console.error('Error deleting post:', error);
          // Handle error if necessary
        }
      });
    }

  }


}


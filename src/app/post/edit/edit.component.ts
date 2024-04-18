import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../post.service';
import { Post } from '../post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  post!: Post;
form: any;

  constructor(
    public postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe({
      next: (data: Post) => {
        this.post = data;
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle error if necessary
      }
    });
  }

  submit() {
    if (this.post) {
      const stringifiedPost = this.postService.JSON.stringify(this.post); // Stringify the post object
      this.postService.update(this.id, stringifiedPost).subscribe({
        next: (res: any) => {
          alert('Data updated successfully!');
          this.router.navigateByUrl('post/index');
        },
        error: (error) => {
          console.error('Error updating post:', error);
          // Handle error if necessary
        }
      });
    }
  }



  // Incorrect usage causing the error
deletePost(id: number): void {
  this.postService.delete(id).subscribe({
    next: () => {
      console.log('Post deleted successfully');
    },
    error: (err) => {
      console.error('Error deleting post:', err);
    }
  });
}


}

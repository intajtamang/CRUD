import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../post.service';
import { Post } from '../post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  post!: Post;
  form!: FormGroup;

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
        this.initializeForm();
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle error if necessary
      }
    });
  }

  initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required]),
      description: new FormControl(this.post.description, Validators.required),
      price: new FormControl(this.post.price, [Validators.required, Validators.min(0)]),
      discountPercentage: new FormControl(this.post.discountPercentage, [Validators.required, Validators.min(0), Validators.max(100)]),
      rating: new FormControl(this.post.rating, [Validators.required, Validators.min(0), Validators.max(5)]),
      stock: new FormControl(this.post.stock),
      brand: new FormControl(this.post.brand),
      category: new FormControl(this.post.category),
      thumbnail: new FormControl(this.post.thumbnail),
      images: new FormControl(this.post.images)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const postData: Post = {
        id: this.id,
        title: this.form.value.title,
        description: this.form.value.description,
        price: this.form.value.price,
        discountPercentage: this.form.value.discountPercentage,
        rating: this.form.value.rating,
        stock: this.form.value.stock,
        brand: this.form.value.brand,
        category: this.form.value.category,
        thumbnail: this.form.value.thumbnail,
        images: this.form.value.images
      };

      console.log(postData);
      this.postService.update(this.id, postData).subscribe({
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

  deletePost(id: number) {
    this.postService.delete(id).subscribe({
      next: () => {
        // Remove the deleted post from the local array
        this.router.navigateByUrl('post/index');
        alert('Post Deleted Successfully!');
      },
      error: (error) => {
        console.error('Error deleting post:', error);
        // Handle error if necessary
      }
    });
  }
}

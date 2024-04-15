import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  posts: Post[] = [];

  constructor(public postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      discountPercentage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
      stock: new FormControl(0),
      brand: new FormControl(''),
      category: new FormControl(''),
      thumbnail: new FormControl(''),
      images: new FormControl([])
    });

    this.loadPosts(); // Load posts on component initialization
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const postData: Post = {
        id: Math.floor(Math.random() * 1000), // Generate a random id for demonstration purpose
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

      this.postService.create(postData).subscribe((createdPost: Post) => {

        console.log(createdPost)
        // this.posts = (createdPost); // Add the newly created post to the beginning of the array
        console.log(this.posts)
        this.totalItems++; // Increment totalItems
        alert('Post Created Successfully!');
        this.router.navigateByUrl('/post/index');
      });
    }
  }

  // Method to load posts
  loadPosts() {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }
}
 ```

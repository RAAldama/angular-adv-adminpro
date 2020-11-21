import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: User;
  uploadImage: File;
  imgTemp: any = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private fileUploadService: FileUploadService) { 
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  updateProfile(){
    console.log(this.profileForm.value);
    this.userService.updateUser(this.profileForm.value).subscribe(() => {
      const {name, email} = this.profileForm.value;
      this.user.name = name;
      this.user.email = email;

      Swal.fire('Changes Saved!', 'Your profile has been updated', 'success');
    }, (err) => {
      Swal.fire('Oh no!', err.error.msg, 'error');
    })
  }

  changeImage(file: File){
    this.uploadImage = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadNewImage(){
    this.fileUploadService.upatePhoto(this.uploadImage, 'users', this.user.uid).then(img => {
      this.user.img = img;
      Swal.fire('Changes Saved!', 'Your profile image has been updated', 'success');
    }).catch(err => {
      Swal.fire('Oh no!', 'The image could not be uploaded', 'error');
    })
  }

}

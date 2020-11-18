import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  formSubmited = false;

  public registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: [false, Validators.required]
  }, {
    validators: this.samePasswords('password', 'password2')
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser(){
    this.formSubmited = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe(ans => {
      this.router.navigateByUrl('/')
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })
  }
  
  unvalidField(field: string): boolean {
    if(this.registerForm.get(field).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }

  unvalidPasswords(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if((pass1 !== pass2) && this.formSubmited){
      return true;
    }else{
      return false;
    }

  }

  samePasswords(password1: string, password2: string){
    return (formGroup: FormGroup) => {
      const pass1Control1 = formGroup.get(password1);
      const pass2Control2 = formGroup.get(password2);

      if(pass1Control1.value === pass2Control2.value){
        pass2Control2.setErrors(null);
      }else{
        pass2Control2.setErrors({ notEqual: true })
      }
    }
  }

  acceptTerms(){
    return !this.registerForm.get('terms').value && this.formSubmited;
  }

}

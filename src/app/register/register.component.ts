
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, ReactiveFormsModule],
  standalone: true
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor( private registerService: RegisterService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    const UserName = this.registerForm.get('UserName')!.value;
    const Password = this.registerForm.get('Password')!.value;

    this.registerService.register(UserName, Password).subscribe(
      (response) => {
        // Handle successful registration, you might want to navigate to login or perform other actions
        console.log('Registration successful:', response);
      },
      (error) => {
        // Handle registration error
        console.error('Registration error:', error);
      }
    );
  }
}
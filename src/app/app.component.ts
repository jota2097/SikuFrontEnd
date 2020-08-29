import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/Interfaces/IUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: FormGroup;
  users: IUser[] = []
  constructor(private _formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buildFormGroup();
    this.getAll();
  }

  buildFormGroup(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required]
    });
  }

  save(): void {
    let user = {
      Email: this.form.controls['email'].value,
      Name: this.form.controls['name'].value,
    }
    this.userService.saveUser(user)
      .subscribe(
        response => {
          this.form.reset();
          this.snackBar.open("Se ha guardado correctamente los datos.", "ok", {
            duration: 2000,
          });
          this.getAll();
        },
        error => {
          this.snackBar.open("Hubo un error procesando los datos.", "ok", {
            duration: 2000,
          });
        }
      );
  }

  getAll(): void {
    this.userService.getAll()
      .subscribe(
        response => {
          this.users = response.body;
        },
        error => {
          this.snackBar.open("Hubo un error procesando cargando los datos.", "ok", {
            duration: 2000,
          });
        }
      );
  }

}

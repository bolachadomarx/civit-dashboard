import { Observable, Subscription } from 'rxjs'
import { UserModel } from './../../_models/user'
import { UserService } from './../../_services/user.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.touched && control.invalid && control.parent.dirty)
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty)

    return invalidCtrl || invalidParent
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  fb: FormBuilder = new FormBuilder()
  signupForm: FormGroup
  passwordForm: FormGroup
  matcher = new PasswordErrorStateMatcher()
  signup$: Subscription

  constructor(private userService: UserService, private toastr: ToastrService, private route: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    })

    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
        passwordConfirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      },
      { validator: this.checkPasswords }
    )
  }

  ngOnInit(): void {}

  save() {
    const user: UserModel = Object.assign({}, this.signupForm.value, {
      password: this.passwordForm.controls.password.value,
      role: 'user',
      isEnabled: true,
    })

    this.signup$ = this.userService.signup(user).subscribe(
      (res) => {
        this.toastr.success('Você foi cadastrado!', 'Sucesso')
        this.route.navigate(['login'])
      },
      (error) => {
        this.toastr.warning('Erro ao cadastrar usuário!', 'Falha')
        this.signupForm.reset()
        this.passwordForm.reset()
      }
    )
  }
  checkPasswords(group: FormGroup) {
    return group.controls.password.value === group.controls.passwordConfirmation.value ? null : { different: true }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.signup$.unsubscribe()
  }
}

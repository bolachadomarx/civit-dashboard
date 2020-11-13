import { AuthenticationService } from './../../_services/authentication.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  fb: FormBuilder = new FormBuilder()
  loginForm: FormGroup
  authentication$: Subscription

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private route: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {}

  login() {
    const email = this.loginForm.get('email').value
    const password = this.loginForm.get('password').value

    this.authentication$ = this.authenticationService.login(email, password).subscribe(
      (res) => {
        this.toastr.success('Você foi logado!', 'Sucesso')
        this.route.navigate(['dashboard', 'home'])
      },
      (error) => {
        this.toastr.warning('Erro ao logar usuário!', 'Falha')
        this.loginForm.reset()
      }
    )
  }
}

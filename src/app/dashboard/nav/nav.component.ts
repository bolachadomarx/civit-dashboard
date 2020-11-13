import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { AuthenticationService } from 'src/app/_services/authentication.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  )
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout()
    this.route.navigate(['/login'])
  }
}

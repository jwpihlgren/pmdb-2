import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  links: HeaderLink[] = [
      {name: "Home", href: "", exact: true},
      {name: "Movies", href: "movies", exact: false},
      {name: "Shows", href: "shows", exact: false},
      {name: "test", href: "test", exact: true},
  ]
}

interface HeaderLink {
    name: string
    href: string
    exact: boolean
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
    protected routingService: RoutingService = inject(RoutingService)
}

import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-page-not-found',
  styleUrl: './page-not-found.component.scss',
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {
  @Input() protected title: string = '';
  @Input() protected description: string = '';
}

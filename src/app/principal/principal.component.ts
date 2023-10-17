import { Component } from '@angular/core';
import { PrincipalService } from './principal.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  template: `
    <button (click)="testarApi()">Testar API</button>
    <div *ngIf="apiResponse">
      <pre>{{ apiResponse | json }}</pre>
    </div>
  `,
})
export class PrincipalComponent {

  apiResponse: any;

  constructor(private principalService: PrincipalService) {}

  testarApi() {
    this.principalService.testApiRequest().subscribe((response) => {
      this.apiResponse = response;
    });
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  footerMarginTop: number = 0;

  onTableHeightChanged(height: number) {
    this.footerMarginTop = height;
  }

}

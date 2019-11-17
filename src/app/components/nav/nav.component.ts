import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('mobileMenu') mobileMenu: ElementRef;

  toggleNavbar() {
      this.navBurger.nativeElement.classList.toggle('is-active');
      this.mobileMenu.nativeElement.classList.toggle('is-active');
  }

}

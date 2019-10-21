import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @ViewChild('navBurger', {static: false}) navBurger: ElementRef;
  @ViewChild('mobileMenu', {static: false}) mobileMenu: ElementRef;

  toggleNavbar() {
      this.navBurger.nativeElement.classList.toggle('is-active');
      this.mobileMenu.nativeElement.classList.toggle('is-active');
  }

}

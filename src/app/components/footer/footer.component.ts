import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  url = "https://otto.zenly.xyz";
  text = "@doug_gibbons - thanks for ʘttʘ!";

  constructor() { }

  ngOnInit() {
  }

  twitter() {

    let shareURL = "http://twitter.com/share?";
    //params
    let params = {
      url: this.url,
      text: this.text,
      // via: "doug_gibbons",
      // hashtags: "otto-mqtt"
    }
    for (let prop in params) {
      shareURL += '&' + prop + '=' + encodeURIComponent(params[prop]);
    }
    window.open(shareURL, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');

    return false;
  }

  github() {
    let shareURL = "https://github.com/douglas-gibbons/otto";
    window.open(shareURL, '');
    return false;
  }

}

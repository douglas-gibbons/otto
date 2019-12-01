import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  public markdownSource = 'assets/docs/index.md';
  private sub: any;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       let page = params['page'];
       // Tasmota wiki redirect
       if (page == "tasmota") {
         window.location.href = "https://github.com/douglas-gibbons/otto/wiki/tasmota";
       }
       if (page) {
         this.markdownSource = 'assets/docs/' + page + ".md";
       }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

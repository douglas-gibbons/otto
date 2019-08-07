import { Component, OnInit } from '@angular/core';
// import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  public markdownSource = 'assets/docs/_index.md';
  private sub: any;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       let page = params['page'];
       if (page) {
         console.log("Loading page " + page);
         this.markdownSource = 'assets/docs/' + page + ".md";
       }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

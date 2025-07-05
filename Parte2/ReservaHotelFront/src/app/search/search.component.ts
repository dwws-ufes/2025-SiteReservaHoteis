import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm: string = "";
  @Output("searchTerm") $searchTermEvent = new EventEmitter<string>();
  constructor(private readonly route: ActivatedRoute, private  router:Router) { }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   if (params['searchTerm'])
    //     this.searchTerm = params['searchTerm'];
    // })
  }

  search():void{
    // if(this.searchTerm)
    // this.router.navigateByUrl('/services/list/' + this.searchTerm);
    this.$searchTermEvent.emit(this.searchTerm);
  }
}
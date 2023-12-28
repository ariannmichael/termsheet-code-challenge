import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent implements OnInit{
  
  constructor() { }
  
  ngOnInit() {
    console.log('DealListComponent');
  }
}

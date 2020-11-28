import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.less'],
})
export class RightNavComponent implements OnInit {
  @HostBinding('style.width')
  private width = '256px';

  constructor() {}

  ngOnInit(): void {}
}

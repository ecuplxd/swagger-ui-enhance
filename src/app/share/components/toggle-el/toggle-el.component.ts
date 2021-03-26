import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-el',
  templateUrl: './toggle-el.component.html',
  styleUrls: ['./toggle-el.component.less'],
})
export class ToggleElComponent implements OnInit {
  @Input() expand = true;

  @Output() expandChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  toggle(): void {
    this.expand = !this.expand;
    this.expandChange.emit(this.expand);
  }
}

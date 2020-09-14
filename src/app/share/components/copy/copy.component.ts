import { Component, Input, OnInit } from '@angular/core';
import { CopyService } from '../../service';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.less'],
})
export class CopyComponent implements OnInit {
  @Input() value = '';

  @Input() title = '复制';

  @Input() selector!: string;

  constructor(private copyService: CopyService) {}

  ngOnInit(): void {}

  copy(): void {
    this.copyService.copy(this.selector || this.value, !!this.selector);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from '../../service';
import { KEYS, Theme, ThemeKey } from '../../service/theme/theme.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.less'],
})
export class ThemeComponent implements OnInit {
  keys: ThemeKey[] = KEYS;

  theme = new Theme();

  constructor(
    private themeService: ThemeService,
    public dialogRef: MatDialogRef<ThemeComponent>
  ) {}

  ngOnInit(): void {}

  update(): void {
    this.themeService.useTheme(this.theme);
  }

  rest(): void {
    this.themeService.useLocalTheme();
    this.dialogRef.close();
  }

  apply(): void {
    this.dialogRef.close();
    this.themeService.saveToLocal(this.theme);
  }
}

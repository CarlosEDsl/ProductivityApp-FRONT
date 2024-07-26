import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  })

export class SideBarComponent {

  @Input() isSideBarCompacted: boolean = true;

}

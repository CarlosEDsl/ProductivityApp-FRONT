import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatToolbarModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  })

export class SideBarComponent {

  @Input() isSideBarCompacted: boolean = true;
  @Output() isSideBarChange = new EventEmitter();

  onOpenedChange(){
    this.isSideBarChange.emit(false);
  }

}


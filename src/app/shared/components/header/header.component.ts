import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

/**
 * HeaderComponent is a component to mount the header
 * and be reused if needed, has links to the Deal List
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}

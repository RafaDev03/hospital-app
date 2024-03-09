import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isSidebarVisible = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.getSidebarVisibility().subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }
}

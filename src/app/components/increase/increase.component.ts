import { CommonModule, I18nPluralPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './increase.component.html',
  styleUrl: './increase.component.css',
})
export class IncreaseComponent implements OnInit {
  @Input() btnClass: string = 'btn-danger';
  @Input() progreso: number = 50;
  @Output() valorSalida = new EventEmitter<number>();
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  increase(valor: number) {
    this.progreso += valor;
    this.valorSalida.emit(this.progreso);
  }
}

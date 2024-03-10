import { CommonModule, I18nPluralPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-increase',
  standalone: true,
  imports: [CommonModule, FormsModule],

  templateUrl: './increase.component.html',
  styleUrl: './increase.component.css',
})
export class IncreaseComponent implements OnInit {
  @Input() btnClass: string = 'btn-primary';
  @Input('valorEntrada') progreso: number = 50;
  @Output() valorSalida = new EventEmitter<number>();
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  increase(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return;
    } else if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return;
    }
    this.progreso += valor;
    this.valorSalida.emit(this.progreso);
  }
  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
  }
}

import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aviso-input',
  templateUrl: './aviso-input.component.html',
  styleUrls: ['./aviso-input.component.sass']
})
export class AvisoInputComponent implements OnInit {

  @Input() atributo = new FormControl;
  @Input() texto:string = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.atributo)
  }

}

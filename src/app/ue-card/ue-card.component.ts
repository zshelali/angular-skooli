import { Component, OnInit, Input } from '@angular/core';
import {Ue} from 'src/app/models/ue.interface'

@Component({
  selector: 'app-ue-card',
  templateUrl: './ue-card.component.html',
  styleUrls: ['./ue-card.component.css']
})
export class UeCardComponent implements OnInit {

  @Input() ue !: Ue;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

import { RegistersService } from '../../services/registers.service';

@Component({
  selector: 'app-voltage',
  templateUrl: './voltage.component.html',
  styleUrls: ['./voltage.component.css']
})
export class VoltageComponent implements OnInit {
  
  public arr = [1,2,3]

  constructor(private registers: RegistersService) { }

  ngOnInit(): void {
  }

}

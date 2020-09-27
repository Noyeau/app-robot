import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent implements OnInit {
  @Input() transform=null;
  @Input() code = "arrow";
  @Input() transformOrigin=null;
  @Input() style=null;
  @Input() width="100%";
  @Input() height="100%";

  constructor() { }

  ngOnInit() {
  }

}

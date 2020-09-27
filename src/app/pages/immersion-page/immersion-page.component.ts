import { Component, OnInit } from '@angular/core';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-immersion-page',
  templateUrl: './immersion-page.component.html',
  styleUrls: ['./immersion-page.component.css']
})
export class ImmersionPageComponent implements OnInit {

  constructor(
    private robotService:RobotService
  ) { }

  ngOnInit() {
  }

  onJoystickUpdate(origine, data){
    this.robotService.sendActionSocket(data)
    console.log(origine, data)
  }



}

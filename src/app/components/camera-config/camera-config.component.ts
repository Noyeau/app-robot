import { Component, OnInit, Input } from '@angular/core';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-camera-config',
  templateUrl: './camera-config.component.html',
  styleUrls: ['./camera-config.component.css']
})
export class CameraConfigComponent implements OnInit {
  faceDet=false
  osd=false;
  frameRate=10;
  statusRate=4;
  
  videoSources=[
   "camera:front",
   "camera:heat",
   'envAnalyser:camera-front:tracking',
   'envAnalyser:camera-rear:tracking',
   'test'
  ]
  videoFrameListe=[this.videoSources[0]]

  
  
  
  @Input() cameraCode="front"
  constructor(
    private robotService: RobotService
  ) { }





  ngOnInit() {
  }


  analyser(type){
    this.robotService.sendActionSocket({type:"envAnalyser",function:type})
  }

  displayOSD(){
    this.osd=!this.osd
    this.robotService.setConfig("socket", {OSD:this.osd})
  }

  changeFrameRate(){
      this.robotService.setConfig("socket", {frameRate:+this.frameRate})
  }

  changeStatusRate(){
    if(this.statusRate<1){
      this.statusRate=1
    }
      this.robotService.setConfig("socket", {statusRate:+this.statusRate})
  }

  changeVideoFrame(){
      this.robotService.startVideoFrame(this.videoFrameListe)
  }



  

  goHome(){
    this.robotService.sendActionSocket({ code: "goHomeQR"})
  }
  goHome2(){
    this.robotService.sendActionSocket({ code: "goHomeCible"})
  }

vitesse=0
  changeVitesse(){
    this.robotService.socketEmit('test',this.vitesse)
  }


}

import { Component, OnInit } from '@angular/core';
import { SocketIoService } from 'src/app/services/socketIo.service';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-immersion',
  templateUrl: './immersion.component.html',
  styleUrls: ['./immersion.component.css']
})
export class ImmersionComponent implements OnInit {
  bottomCenterDisplay = false
  rightDisplay = false
  public frontImage;
  constructor(
    private robotService: RobotService,

    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this.robotService.startVideoFrame(['camera:front'])
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.robotService.startVideoFrame([])

  }



  getImage() {
    if (this.robotService.videoFrame
      && this.robotService.videoFrame[0]
      && this.robotService.videoFrame[0].image
    ) {
      return this.robotService.videoFrame[0].image
    }
    return false
  }


  getBackgroundImage() {
    if (this.frontImage) {
      return {
        'background-image': `url("data:image/jpeg;base64,${this.frontImage}")`
      }
    }
    return ''
  }

  mouvActive=false
  mouv() {
    this.mouvActive=true
    this.robotService.sendActionSocket({ code: "goTo", data: { x: 0, y: 1 } })

    setTimeout(() => {
      this.robotService.sendActionSocket({ code: "goTo", data: { x: -1, y: 0 } })

      setTimeout(() => {
        this.robotService.sendActionSocket({ code: "goTo", data: { x: 0, y: -1 } })

        setTimeout(() => {
          this.robotService.sendActionSocket({ code: "goTo", data: { x: 1, y: 0 } })
          
          setTimeout(() => { 
            if(this.mouvActive){
              return this.mouv()
            }
            this.robotService.sendActionSocket({ code: "stop"})
          }, 500)
        }, 500)
      }, 500)

    }, 500)
  }

}

import { Injectable, EventEmitter } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';


@Injectable({
  providedIn: 'root'
})
export class RobotService {

  public videoFrame;

  public videoFrameUpdate: EventEmitter<any> = new EventEmitter()

  public status;

  public statusUpdate: EventEmitter<any> = new EventEmitter()
  constructor(
    private socket: Socket
  ) {
    this.getStatus().subscribe(res => {
      this.status = res
      this.statusUpdate.emit(res)
    })

    this.getVideoFrame().subscribe(res => {
      console.log('videoFrame Recu')
      this.videoFrame = res
      this.videoFrameUpdate.emit(res)
    })


    this.socket
      .fromEvent("myRobot").subscribe(res=>console.log(res))
  }


  // sendMouvementSocket(action) {
  //   this.socket.emit("mouvment", action);
  // }

  sendActionSocket(action) {
    this.socket.emit("action", action);
  }

  
  sendEnvAnalyser(code, data=null) {
    this.socket.emit("envAnalyser", {code:code, data});
  }

  setConfig(configType, data) {
    let action = { type: configType, data: data }
    this.socket.emit("config", action);
  }

  socketEmit(key, data) {
    this.socket.emit(key, data);
  }

  checkRadar() {
    let action = {
      code: "check"
    }
    this.sendActionSocket(action)
  }


  getStatus() {
    return this.socket
      .fromEvent("status")
  }


  startVideoFrame(videoFrame) {
    this.setConfig('socket', { videoFrame: videoFrame })
  }
  /**
 * Receptionne les images (camera et autre)
 */
  getVideoFrame() {
    return this.socket
      .fromEvent("videoFrame")
  }
}

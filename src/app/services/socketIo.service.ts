import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socket: Socket) {
    console.log('start service')
  }


  sendMouvment(dataMouv: any) {
    this.socket.emit("mouvment", dataMouv);
  }

  sendAction(dataAction: any) {
    this.socket.emit("action", dataAction);
  }


  sendConfig(data: any) {
    this.socket.emit("config", data);
  }


  /**
   * Receptionne les images (camera et autre)
   */
  getImageB64() {
    return this.socket
      .fromEvent("image")
  }

  /**
   * Utiliser les status du RobotService
   */
  getStatus() {
    return this.socket
    .fromEvent("status")
  }

}

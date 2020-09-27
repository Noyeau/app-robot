import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
declare const VirtualJoystick: any;


@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.css']
})
export class JoystickComponent implements OnInit {

  joystick
  joystick2
  @Input() containerId

  @Input() optionJoy1 = {
    strokeStyle: 'cyan',
    limitStickTravel: true,
    stickRadius: 120
  }
  @Input() optionJoy2 = {
    strokeStyle: 'orange',
    limitStickTravel: true,
    stickRadius: 120
  }

  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.createJoystickGoTo()
    this.createJoystickRotation()
    setInterval(() => {
      this.emitData()
    }, 100)
  }




  createJoystickGoTo() {
    if (!this.containerId) {
      return console.log('erreur containerId manquant')
    }
    console.log("VirtualJoystick => " + this.containerId)
    let options = { ...this.optionJoy1, container: document.getElementById(this.containerId) }
    this.joystick = new VirtualJoystick(options);
    this.joystick.addEventListener('touchStartValidation', function (event) {
      console.log('start')
      var touch = event.changedTouches[0];
      if (touch.pageX < window.innerWidth / 2) return false;
      return true
    });

    this.joystick.addEventListener('touchEnd', () => {
      console.log('end')
      setTimeout(() => {
        this.onUpdate.emit({ code: "stop" })
      }, 100)
    })
  }

  createJoystickRotation() {
    let options = { ...this.optionJoy2, container: document.getElementById(this.containerId) }
    this.joystick2 = new VirtualJoystick(options);
    // one on the left of the screen
    this.joystick2.addEventListener('touchStartValidation', function (event) {
      var touch = event.changedTouches[0];
      if (touch.pageX >= window.innerWidth / 2) return false;
      return true
    });
    this.joystick2.addEventListener('touchEnd', () => {
      setTimeout(() => {
        this.onUpdate.emit({ code: "stop" })
      }, 100)
    })
  }


  emitData() {
    let x = +this.joystick.deltaX()
    let y = +this.joystick.deltaY() * -1
    if (x || y) {
      x = (x / 120)
      y = (y / 120)
      this.onUpdate.emit({ code: "goTo", data: { x: x, y: y } })
    }
    let x2 = +this.joystick2.deltaX()
    let y2 = +this.joystick2.deltaY() * -1
    if ((x2 || y2) && !x && !y) {
      x2 = (x2 / 120)
      y2 = (y2 / 120)
      let z2 = x2 > 0 ? 1-Math.abs(y2) : -1+Math.abs(y2)
      this.onUpdate.emit({ code: "rotate", data: { x: 0, y: 0, z: z2 } })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { SocketIoService } from 'src/app/services/socketIo.service';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})
export class RadarComponent implements OnInit {
  sensors
  obstacles: any = {}
  svgRadars
  constructor(
    private _socketIoService: SocketIoService,
    private robotService: RobotService
  ) { }

  ngOnInit() {
    this.designRadars()
    this._socketIoService.getStatus().subscribe((x: any) => {
      console.log(x)
      this.sensors = x.sensors
    })
  }


  checkradar() {
    this.robotService.sendActionSocket({code :"checkRadar"})
  }


  designRadars() {
    this.svgRadars = d3.select('#radars').append('svg')
      .attr("viewBox", `0 0 100 100`)


    let radarDef = this.svgRadars.append('defs')
    let radialGradientDef = radarDef.append('radialGradient').attr("id", "exampleGradient")
    radialGradientDef.append('stop')
      .attr("offset", "10%")
      .attr("stop-color", "rgba(150,255,150,0.75)")
    radialGradientDef.append('stop')
      .attr("offset", "95%")
      .attr("stop-color", "rgba(255,255,255,0.2)")


    let radarZone = this.svgRadars.append('rect')
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 100)
      .attr("height", 100)
      .attr("style", "fill:url(#exampleGradient);fill-opacity:0.3;stroke:black;stroke-width:1;")

    let robotPosition = this.svgRadars.append('rect')
      .attr("x", 40)
      .attr("y", 50)
      .attr("width", 20)
      .attr("height", 20)
      .attr("style", "fill:none;stroke:black;stroke-width:0.3;")
      .attr("transform-origin", "center")

    this.obstacles = {}
    this.obstacles.top = this.svgRadars.append('rect')
      .attr("x", 45)
      .attr("y", 45)
      .attr("width", 10)
      .attr("height", 3)

    this.obstacles.topRight = this.svgRadars.append('polyline')
      .attr("points", "55,45 65,45 65,55")
      .attr("stroke", "red")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)

    this.obstacles.topLeft = this.svgRadars.append('polyline')
      .attr("points", "45,45 35,45 35,55")
      .attr("stroke", "red")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)

    this.obstacles.bottomLeft = this.svgRadars.append('polyline')
      .attr("points", "35,65 35,75 45,75")
      .attr("stroke", "red")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)

    this.obstacles.bottomRight = this.svgRadars.append('polyline')
      .attr("points", "55,75 65,75 65,65")
      .attr("stroke", "red")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)
    setInterval(() => {
      this.updateRadar()
    }, 200)
  }


  /**
   * Mise à jour du radar 
   * 
   */
  updateRadar() {
    if (this.sensors && this.sensors.ir) {
      this.obstacles.topRight.attr("opacity", (this.sensors.ir.topRight == 0) ? 1 : 0)
      this.obstacles.topLeft.attr("opacity", (this.sensors.ir.topLeft == 0) ? 1 : 0)
      this.obstacles.bottomLeft.attr("opacity", (this.sensors.ir.bottomLeft == 0) ? 1 : 0)
      this.obstacles.bottomRight.attr("opacity", (this.sensors.ir.bottomRight == 0) ? 1 : 0)
    }

    if (this.sensors && this.sensors.radar) {
      this.svgRadars.selectAll("circle").remove()
      this.svgRadars.selectAll("polyline.radar-line").remove()

      let courbe = ""
      let radarArray = Object.keys(this.sensors.radar).map(i => { return { angle: +i, value: this.sensors.radar[i] } }).sort((a, b) => {
        return a.angle - b.angle
      }).filter(x => x.value !== null)

      radarArray.map((elemRadar, i) => {
        let x = elemRadar.angle
        let dist = elemRadar.value
        if (dist > 50) {
          dist = 50;
        }
        let positionX = (+x > 0) ? Math.abs(Math.sin(Math.abs(x)) * dist) : Math.abs(Math.sin(Math.abs(x)) * dist) * -1
        let positionY = Math.abs(Math.cos(Math.abs(x)) * dist)

        positionX = (positionX) + 50
        positionY = -(positionY) + 50

        if (elemRadar.angle > -10 && elemRadar.angle < 10) {
          courbe += positionX + "," + positionY + " "
        }

        this.svgRadars.append("circle")
          .attr("cx", positionX)
          .attr("cy", positionY)
          .attr("r", 0.5)

      })
      this.svgRadars.append("polyline")
        .attr("points", courbe)
        .attr("stroke", "green")
        .attr("class", "radar-line")
        .attr("fill", "transparent")
    }
  }
}
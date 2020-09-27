import { Component, OnInit } from '@angular/core';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-environment-analyser',
  templateUrl: './environment-analyser.component.html',
  styleUrls: ['./environment-analyser.component.css']
})
export class EnvironmentAnalyserComponent implements OnInit {

  envAnalyserList = [
   
    {
      code: "tracking",
      label:"Tracking",
      description:"Détection de mouvement",
      type: "local"
    },
    {
      code: "faceMark",
      label:"Visage ?",
      description:"Repère les contours des visages",
      type: "apiNoyeau"
    },
    {
      code: "multipleElems",
      label:"Il y a quoi ?",
      description:"Repère tous les objets qu'il peut",
      type: "apiNoyeau"
    },
    {
      code: "oneElem",
      label:"Tu vois quoi ?",
      description:"Donne l'élément le plus probable",
      type: "apiNoyeau"
    },
  ]

  envAnalyserStatus;
  constructor(
    private _robotService: RobotService
  ) { }

  ngOnInit() {
    this._robotService.statusUpdate.subscribe(res => {
      console.log(res)
      if (res && res.envAnalyser) {
        this.envAnalyserStatus = this.convertToArray(res.envAnalyser)
      }
    })
  }

  envAnalyser(functionName) {
    return this._robotService.sendEnvAnalyser(functionName)
  }


  trakByEnvAnalyser(index,item){
    return  item.code
  }


  private convertToArray(envAnalys) {
    let rep = []
    for (let x in envAnalys) {
      console.log(x)
      rep.push({
        code: x,
        ...envAnalys[x]
      })
    }
    return rep
  }

  getBestMultipleElems(data) {
    console.log(data)
    return data.filter(x => x.confidence > 0.5).map((x, i) => { return i + "-" + x.className + "(" + (+x.confidence * 100).toFixed() + "%)" })
  }

}

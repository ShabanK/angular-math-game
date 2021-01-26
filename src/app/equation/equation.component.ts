import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, MaxLengthValidator} from "@angular/forms"
import { CustomValidators } from "../custom-validators"
import { delay,filter, scan } from "rxjs/operators"
@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolution:number=0;
  mathForm = new FormGroup({
    a: new FormControl(this.generateRandomNumber()),
    b: new FormControl(this.generateRandomNumber()),
    answer: new FormControl("")},
    [
      CustomValidators.addition("answer", "a", "b")
    ]                 
  )

  constructor() { }

  //getters
  get a(){
    return this.mathForm.value.a
  }

  get b(){
    return this.mathForm.value.b
  }

  ngOnInit() {
    this.mathForm.statusChanges
    .pipe(
        filter(value=>value==="VALID"),
        delay(300),
        scan((acc)=>{
          return {
            numberSolved: acc.numberSolved + 1,
            startTime: acc.startTime
          }
        },{numberSolved:0, startTime: new Date()})
      )
    .subscribe(({numberSolved, startTime})=>{
      numberSolved++
      this.secondsPerSolution = (
        new Date().getTime() - startTime.getTime()
      ) / numberSolved / 1000

      this.mathForm.patchValue({
        a:this.generateRandomNumber(),
        b:this.generateRandomNumber(),
        answer: ""
      })      
    })

  }
  generateRandomNumber(){
    return Math.floor(Math.random()*10) //return number b/w 0 and 9
  }
}

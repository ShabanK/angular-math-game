import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, MaxLengthValidator} from "@angular/forms"
import { CustomValidators } from "../custom-validators"
import { delay } from "rxjs/operators"
@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {

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
    .pipe(delay(300))
    .subscribe((value)=>{
      if(value==="INVALID"){
        return;
      } else {
        this.mathForm.patchValue({
          a:this.generateRandomNumber(),
          b:this.generateRandomNumber(),
          answer: ""
        })
        // this.mathForm.controls.a.setValue(this.generateRandomNumber())
        // this.mathForm.controls.b.setValue(this.generateRandomNumber())
        // this.mathForm.controls.answer.setValue("")
      }
    })

  }
  generateRandomNumber(){
    return Math.floor(Math.random()*10) //return number b/w 0 and 9
  }
}

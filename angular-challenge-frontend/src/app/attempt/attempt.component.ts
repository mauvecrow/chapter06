import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChallengeService } from '../challenge.service';
import { Attempt } from '../attempt';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.css']
})
export class AttemptComponent implements OnInit {

  @Input() factorA?: number;
  @Input() factorB?: number;
  @Output() result = new EventEmitter();

  attemptGroup = this.formBuilder.group(
    {
      userAlias: [''],
      guess: ['']
    }
  )

  constructor(private formBuilder: FormBuilder, private challengeService: ChallengeService) { }

  ngOnInit(): void {
  }

  post(){
    let attempt: Attempt = {
      factorA: this.factorA!,
      factorB: this.factorB!,
      userAlias: this.attemptGroup.value.userAlias,
      guess: this.attemptGroup.value.guess
    }
    this.challengeService.postAttempt(attempt)
      .subscribe(resp => {
        this.message = JSON.stringify(resp);
        this.result.emit(resp.correct);
      }
      );
    // console.log(this.attemptGroup.value);
    // this.printMessage();
  }

  message: string = '';
  private printMessage(){
    this.message = 'value: ' + this.attemptGroup.value;
  }

}

import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../challenge.service';
import { RandomChallenge } from '../random_challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  randomChallenge: RandomChallenge = {factorA: 0, factorB: 0};
  solved?: boolean;
  resultMessage?: string;
  constructor (private challenge: ChallengeService){}

  ngOnInit(): void {
    this.generateChallenge();
  }
  
  checkResponse(result: boolean){
    this.solved = result;
    console.log(`result: ${result}, solved: ${this.solved}`);
    this.resultMessage = this.solved ? "That's correct!" : "That's incorrect. Try again?";
    console.log(`resultMessage: ${this.resultMessage}`);
  }

  generateChallenge(){
    this.challenge.getChallenge()
      .subscribe(resp => this.randomChallenge = resp);
  }

}

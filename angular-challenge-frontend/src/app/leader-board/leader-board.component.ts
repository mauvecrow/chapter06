import { Component, OnInit } from '@angular/core';
import { ChallengeService, UpdatedRow } from '../challenge.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  updatedRows: UpdatedRow[] = [];
  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.addRecords();
  }

  addRecords(){
    this.challengeService.setupLeaderboard(this.updatedRows);
  }

  refresh(){
    this.updatedRows = [];
    this.addRecords();
  }

  



}



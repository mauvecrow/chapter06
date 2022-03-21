import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RandomChallenge } from './random_challenge';
import { Attempt } from './attempt';
import { ChallengeResult } from './challenge_result';
import { LeaderBoardRow } from './leaderboard_row';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private static CHALLENGE_URL: string = 'http://localhost:8080/challenges/random';
  private static ATTEMPT_URL: string = 'http://localhost:8080/attempts';
  private static LEADERBOARD_URL: string = 'http://localhost:8081/leaders';
  private static USERS_LIST_URL: string = 'http://localhost:8080/users';
  constructor(private http: HttpClient) { }

  getChallenge(): Observable<RandomChallenge> {
    return this.http.get<RandomChallenge>(ChallengeService.CHALLENGE_URL);
  }

  postAttempt(attempt: Attempt): Observable<ChallengeResult> {
    return this.http.post<ChallengeResult>(ChallengeService.ATTEMPT_URL, attempt);
  }

  getLeaders(): Observable<LeaderBoardRow[]> {
    return this.http.get<LeaderBoardRow[]>(ChallengeService.LEADERBOARD_URL);
  }

  getUsersList(userIds: string): Observable<User[]> {
    return this.http.get<User[]>(`${ChallengeService.USERS_LIST_URL}/${userIds}`);
  }

  setupLeaderboard(updatedRows: UpdatedRow[]) {
    this.getLeaders()
      .subscribe(lb => {
        const leaderBoardRows = lb;
        const userIds: number[] = [];
        leaderBoardRows.forEach(lbRow => userIds.push(lbRow.userId));
        // console.log(`userIds: ${userIds.join(',')}`);
        this.getUsersList(userIds.join(','))
          .subscribe(ul => {
            const users = ul
            leaderBoardRows.forEach(row => {
              const user = users.find(user => user.id === row.userId);
              const alias = user ? user.alias : '';
              const updatedRow: UpdatedRow = { "totalScore": row.totalScore, "alias": alias, "badges": row.badges, "userId": row.userId };
              updatedRows.push(updatedRow);
            })
          });
      });
  }
}

export interface UpdatedRow extends LeaderBoardRow {
  alias: string
}
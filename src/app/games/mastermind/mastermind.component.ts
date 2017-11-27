import { Guess } from './dtos/guess';
import { Component, OnInit, HostListener } from '@angular/core';
import { Peg } from './dtos/pegs';
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from 'constants';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.css']
})
export class MastermindComponent {
  public target: Peg[] = [
    { id: 'target0', filePath: 'assets/images/whitespot.png' },
    { id: 'target1', filePath: 'assets/images/whitespot.png' },
    { id: 'target2', filePath: 'assets/images/whitespot.png' },
    { id: 'target3', filePath: 'assets/images/whitespot.png' },
  ];

  public src: Peg[] = [
    { id: 'src0', filePath: 'assets/images/redspot.png' },
    { id: 'src1', filePath: 'assets/images/greenspot.png' },
    { id: 'src2', filePath: 'assets/images/bluespot.png' },
    { id: 'src3', filePath: 'assets/images/greyspot.png' },
    { id: 'src4', filePath: 'assets/images/yellowspot.png' },
    { id: 'src5', filePath: 'assets/images/blackspot.png' },
    { id: 'src6', filePath: 'assets/images/purplespot.png' },
    { id: 'src7', filePath: 'assets/images/orangespot.png' },
  ];

  public greenTick = 'assets/images/greentick.png';
  public amberTick = 'assets/images/ambertick.png';

  public guess: Guess =
    {
      srcIndexes: [null, null, null, null],
      redCount: '',
      whiteCount: ''
    };

  public prevGuesses: Guess[] = [];
  public solution: string[] = [null, null, null, null];
  public sourceIndex: number;
  public solutionLength = 4;
  public thetarget: string;
  public gameComplete = false;
  public playerHasWon = false;
  public playerHasLost = false;
  public maxGuesses = 2;

  constructor() {
    this.resetGuess();
    this.GenerateSolution();
  }

  resetGuess() {
    this.guess.srcIndexes = [null, null, null, null];
    this.guess.redCount = '';
    this.guess.whiteCount = '';
    for (let i = 0; i < this.solutionLength; ++i) {
      this.target[i].filePath = 'assets/images/whitespot.png';
    }
  }

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.thetarget = event.srcElement.id;
  }

  @HostListener('dragend', ['$event'])
  public onDrop(event: DragEvent) {

    event.preventDefault();
    event.stopPropagation();
    const targetIndex = Number(this.thetarget.substring(6));
    const srcIndex = this.getSrcIndex(event.srcElement.id);
    if (this.duplicateDetected(srcIndex)) { return; }
    this.target[targetIndex].filePath = this.src[srcIndex].filePath;
    this.updateGuess(srcIndex, targetIndex);
  }

  public guessComplete(): boolean {
    if (this.guess.srcIndexes.some(p => p === null)) {
      return true;
    }
    return false;
  }

  public showGuessInConsole(guess: Guess) {
    console.log('guess indexes:  ' + guess.srcIndexes + ' red: ' + guess.redCount + ' white: '+ guess.whiteCount);
  }

  public GenerateSolution() {
    for (let i = 0; i < this.solutionLength; ++i) {
      let isDuplicate = true;
      while (isDuplicate) {
        const rand = Math.floor(Math.random() * 8);
        if (this.solution.every(p => p !== this.src[rand].filePath)) {
          this.solution[i] = this.src[rand].filePath;
          isDuplicate = false;
        }
      }
    }
  }

  updateGuess(srcIndex: number, targetIndex: number) {
    this.guess.srcIndexes[targetIndex] = srcIndex;
  }

  duplicateDetected(srcIndex: number): boolean {
    if (this.guess.srcIndexes.indexOf(srcIndex) >= 0) {
      console.log('duplicate: ' + this.guess.srcIndexes.indexOf(srcIndex));
      return true;
    }
    return false;
  }

  getSrcIndex(id: string): number {
    return (Number(id.substring(3)));
  }

  checkGuess(envent) {
    let redCount = 0;
    let whiteCount = 0;

    for (let i = 0; i < this.solutionLength; ++i) {

      const filePathTocheck = this.src[this.guess.srcIndexes[i]].filePath;
      if (filePathTocheck === this.solution[i]) {
        redCount++;
      } else if (this.solution.some(p => p === filePathTocheck)) {
        whiteCount++;
      }
    }
    if(redCount >= this.solutionLength) {
      this.playerHasWon = true;
      this.freezeGame();      
      return;
    }
    if(this.prevGuesses.length >= this.maxGuesses) {
      this.playerHasLost = true;
      this.freezeGame();
      return;
    }
    this.guess.redCount = redCount.toString();
    this.guess.whiteCount = whiteCount.toString();
    // this.showGuessInConsole(this.guess);
    
    this.updatePreviousGuesses();
    this.resetGuess();
  }

  updatePreviousGuesses() {
    const guessCopy: Guess = {
      srcIndexes: [null, null, null, null],
      redCount: this.guess.redCount,
      whiteCount: this.guess.whiteCount
    };
    for (let i = 0; i < this.solutionLength; ++i) {
      guessCopy.srcIndexes[i] = this.guess.srcIndexes[i];
    }
    this.prevGuesses.push(guessCopy);
  }

  newGame() {
    this.prevGuesses = [];
    this.resetGuess();
    this.gameComplete = false;
    this.playerHasWon = false;
    this.playerHasLost= false;
    
  }

  freezeGame () {
    this.gameComplete = true;

  }
}



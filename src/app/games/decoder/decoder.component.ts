import { Guess } from './dtos/guess';
import { Component, OnInit, HostListener } from '@angular/core';
import { Peg } from './dtos/pegs';
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from 'constants';
import { forEach } from '@angular/router/src/utils/collection';
import { IconSet } from './dtos/iconSet';


@Component({
  selector: 'app-decoder',
  templateUrl: './decoder.component.html',
  styleUrls: ['./decoder.component.css']
})
export class DecoderComponent {
  public target: Peg[] = [];
  public src: Peg[] = [];

  public greenTick = 'assets/images/greentick.png';
  public amberTick = 'assets/images/ambertick.png';

  public guess: Guess;
  public prevGuesses: Guess[] = [];
  public solution: string[];
  public solutionLength = 4;
  public thetarget: string;
  public gameComplete;
  public playerHasWon = false;
  public playerHasLost = false;
  public maxGuesses = 10;
  public sourceLength = 8;
  public iconSets: IconSet[];
  public iconSet: IconSet;

  constructor() {
    this.populateIconConfig();
    this.newGame();
  }

  populateIconConfig() {
    this.iconSets = [
      {
        value: 'emoticons',
        filePath: 'assets/images/emoticons/src0.png'
      },
      {
        value: 'xmas',
        filePath: 'assets/images/xmas/src0.png'
      },
      {
        value: 'flags',
        filePath: 'assets/images/flags/src0.png'
      }
    ];
  }
  resetSource() {
    this.src = [];
    for (let i = 0; i < this.sourceLength; ++i) {
      let peg: Peg = {
        id: 'src' + i.toString(),
        filePath: 'assets/images/emoticons/src' + i.toString() + '.png'
      }
      this.src.push(peg);
    }
  }

  cheat(itemId: string) {
    let targetIndex: number = this.getTargetIndex(itemId);
    for (let i = 0; i < this.sourceLength; ++i) {
      if (this.src[i].filePath === this.solution[targetIndex]) {
        this.target[targetIndex].filePath = this.src[i].filePath;
        this.guess.srcIndexes[targetIndex] = i;
        break;
      }
    }
  }

  resetTarget() {
    this.target = [];
    for (let i = 0; i < this.solutionLength; ++i) {
      let peg: Peg = {
        id: 'target' + i.toString(),
        filePath: 'assets/images/whitespot.png'
      };
      this.target.push(peg);
    }
  }

  resetGuess() {
    this.guess = {
      srcIndexes: [],
      redCount: '',
      whiteCount: ''
    };
    for (let i = 0; i < this.solutionLength; ++i) {
      this.guess.srcIndexes[i] = null;
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
    console.log('guess indexes:  ' + guess.srcIndexes + ' red: ' + guess.redCount + ' white: ' + guess.whiteCount);
  }

  public GenerateSolution() {
    this.solution = [];
    for (let i = 0; i < this.solutionLength; ++i) {
      this.solution.push('');
    }
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
      return true;
    }
    return false;
  }

  getSrcIndex(id: string): number {
    return (Number(id.substring(3)));
  }

  getTargetIndex(id: string): number {
    return (Number(id.substring(6)));
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
    this.guess.redCount = redCount.toString();
    this.guess.whiteCount = whiteCount.toString();
    this.updatePreviousGuesses();
    if (redCount >= this.solutionLength) {
      this.playerHasWon = true;
      this.freezeGame();
      return;
    }
    if (this.prevGuesses.length >= this.maxGuesses) {
      this.playerHasLost = true;
      this.freezeGame();
      return;
    }

    this.resetTarget();
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
    this.prevGuesses.unshift(guessCopy);
  }

  newGame() {
    this.prevGuesses = [];
    this.resetSource();
    this.resetTarget();
    this.resetGuess();
    this.GenerateSolution();
    this.gameComplete = false;
    this.playerHasWon = false;
    this.playerHasLost = false;
  }

  freezeGame() {
    this.gameComplete = true;
  }
}



import { Peg } from './../decoder/dtos/pegs';
import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-jigsaw',
  templateUrl: './jigsaw.component.html',
  styleUrls: ['./jigsaw.component.css']
})
export class JigsawComponent {
  @ViewChild('layout') canvasRef;

  public pieces: Peg[] = [];
  public iconSetDirectory = 'jigsaw';
  public imgWidth = 100;
  public imgHeight = 133;
  public puzzleWidth = 2;
  public puzzleHeight = 2;

  constructor() {
    this.resetSource();
  }

  resetSource() {
    const basePath = 'assets/images/' + this.iconSetDirectory + '/img';
    this.pieces = [];
    const numPieces = this.imgWidth * this.imgHeight;
    for (let i = 0; i < numPieces; ++i) {
      const peg: Peg = {
        id: 'img' + i.toString(),
        filePath: basePath + i.toString() + '.png'
      };
      this.pieces.push(peg);
    }
  }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    let counter = 0;
    for (let i = 0; i < this.puzzleWidth; ++i) {
      for (let j = 0; j < this.puzzleHeight; ++j) {
      const source = new Image();
      source.crossOrigin = 'Anonymous';
      source.onload = () => {
        context.drawImage(source, (10 * i) + (i * this.imgWidth), (10 * j) + (j * this.imgHeight));
      };
      source.src = this.pieces[counter].filePath;
      counter++;
      console.log(source.src);
    }
    }
  }


}

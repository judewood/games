import { Peg } from './../decoder/dtos/pegs';
import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-jigsaw',
  templateUrl: './jigsaw.component.html',
  styleUrls: ['./jigsaw.component.css']
})
export class JigsawComponent{
  @ViewChild('layout') canvasRef;

  public src: Peg[] = [];
  public sourceLength = 8;
  public iconSetDirectory = 'emoticons';

  constructor() {
    this.resetSource();
  }

  resetSource() {
    const basePath = 'assets/images/' + this.iconSetDirectory + '/src';
    this.src = [];
    for (let i = 0; i < this.sourceLength; ++i) {
      const peg: Peg = {
        id: 'src' + i.toString(),
        filePath: basePath + i.toString() + '.png'
      };
      this.src.push(peg);
    }
  }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    const source = new Image();
    source.crossOrigin = 'Anonymous';
    source.onload = () => {
      //  canvas.height = source.height;
      //  canvas.width = source.width;
        context.drawImage(source, 10, 10, 32, 32);
        
       // context.font = '100px impact';
      //  context.textAlign = 'center';
       // context.fillStyle = 'black';
      //  context.fillText('HELLO WORLD', canvas.width / 2, canvas.height * 0.8);

      //  this.image = canvas.toDataURL();
    };
    source.src = this.src[0].filePath;
  }
 
  ngInit() {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    const source = new Image();
    source.crossOrigin = 'Anonymous';
    source.onload = () => {
        canvas.height = source.height;
        canvas.width = source.width;
        context.drawImage(source, 0, 0);

        context.font = '100px impact';
        context.textAlign = 'center';
        context.fillStyle = 'black';
        context.fillText('HELLO WORLD', canvas.width / 2, canvas.height * 0.8);

        this.image = canvas.toDataURL();
    };
    source.src = this.image;
  }
}

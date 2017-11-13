import { CommonModule } from '@angular/common';
import { JigsawComponent } from './jigsaw/jigsaw.component';
import { MastermindComponent } from './mastermind/mastermind.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        MastermindComponent,
        JigsawComponent],
        imports: [  CommonModule ]
})
export class GamesModule { }

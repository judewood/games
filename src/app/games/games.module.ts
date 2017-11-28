import { CommonModule } from '@angular/common';
import { JigsawComponent } from './jigsaw/jigsaw.component';
import { DecoderComponent } from './decoder/decoder.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        DecoderComponent,
        JigsawComponent],
        imports: [  CommonModule ]
})
export class GamesModule { }

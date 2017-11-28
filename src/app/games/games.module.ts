import { CommonModule } from '@angular/common';
import { JigsawComponent } from './jigsaw/jigsaw.component';
import { DecoderComponent } from './decoder/decoder.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DecoderComponent,
        JigsawComponent],
        imports: [  CommonModule, FormsModule ]
})
export class GamesModule { }

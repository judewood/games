export interface Peg {
    filePath: string;
    id: string;
}

export class PlainPegs {
    public pegs: Peg[] = [
        { id: 'src0', filePath: 'assets/images/redspot.png' },
        { id: 'src1', filePath: 'assets/images/greenspot.png' },
        { id: 'src2', filePath: 'assets/images/bluespot.png' },
        { id: 'src3', filePath: 'assets/images/greyspot.png' },
        { id: 'src4', filePath: 'assets/images/yellowspot.png' },
        { id: 'src5', filePath: 'assets/images/blackspot.png' },
        { id: 'src6', filePath: 'assets/images/purplespot.png' },
        { id: 'src7', filePath: 'assets/images/orangespot.png' },
    ];
}


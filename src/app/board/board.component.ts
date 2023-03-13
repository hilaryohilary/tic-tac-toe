import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import JSConfetti from 'js-confetti';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  squares: any[] = [];
  xIsNext: boolean = false;
  winner: string | undefined ;
  xScore: number = 0;
  OScore: number = 0;

  minimize = false;
  maximize = false;
  fullScreen = false;
  close = true
  jsConfetti = new JSConfetti();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.newGame();
  }

  @ViewChild('winnerRef')
  winnerTemplate!: TemplateRef<any>;

  constructor( private windowService: NbWindowService){}

  openWindow() {
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: this.minimize,
      maximize: this.maximize,
      fullScreen: this.fullScreen,
      close: this.close
    };

    this.windowService.open(
      this.winnerTemplate,
      {title: 'Congratulations', context: {text: this.winner}, buttons: buttonsConfig}
    );
    this.jsConfetti.addConfetti();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = undefined;
    this.xIsNext = !this.xIsNext;
  }
  resetScore() {
    this.newGame();
    this.xScore = 0;
    this.OScore = 0;
  }
  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if(!this.squares[idx]) {
      console.log(!this.squares[idx]);
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner();
    if(this.winner) {
      this.openWindow();
    }
    console.log(this.winner);
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      console.log(a,b,c);
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.squares[a] == 'X'? this.xScore += 1 : this.OScore +=1;
        return this.squares[a];
      }
    }
    return null;
  }
}



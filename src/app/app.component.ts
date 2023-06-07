import { Component } from '@angular/core';
import Player from './services/player.service';
import Sprite from './services/sprite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  background: Sprite = new Sprite('background.avif', { isFullScreen: true });

  player: Player = new Player('first.png', {
    height: 100,
    width: 100,
    movement: 'jumper',
    x: 75,
  });

  obstacles: Player[] = [];

  minDistance: number = 500;

  // obstacle = new Player('first.png', {
  //   height: 50,
  //   width: 50,
  //   movement: 'left',
  //   right: 0,
  // });

  constructor() {
    this.generateRandomObstacle();

    // setInterval(() => {
    //   this.obstacles.push(
    //     new Player('first.png', {
    //       height: 50,
    //       width: 50,
    //       movement: 'left',
    //       right: 0,
    //     })
    //   );
    // }, this.getRandomTime());
  }

  generateRandomObstacle = (): void => {
    this.obstacles.push(
      new Player('first.png', {
        height: 50,
        width: 50,
        movement: 'left',
        right: 0,
        bottom: 0,
      })
    );

    // repeat
    let randomTime = this.getRandomTime();
    setTimeout(
      () => window.requestAnimationFrame(this.generateRandomObstacle),
      randomTime
    );
  };

  getRandomTime = (): number => {
    let random = Math.random() * 1000;
    return random;
  };
}

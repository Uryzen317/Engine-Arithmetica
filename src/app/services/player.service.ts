import Sprite from './sprite.service';

export default class Player extends Sprite {
  public speed: number = 10;
  public isBound: boolean = true;
  public isJumping: boolean = false;
  public canJump: boolean = false;
  public gravity: number = 10;
  public jumpHeightLimit: number = 300;
  public jumpHeightTracker: number = 0;
  public jumpPower: number = 10;

  constructor(
    // passing arguments
    url: string,
    options?: {
      height?: number;
      width?: number;
      movement?: string; // tiler, jumper, directional [left, right, top, bottom]
      x?: number;
      y?: number;
      right?: number;
      left?: number;
      top?: number;
      bottom?: number;
    },
    sprite?: any
  ) {
    // proper inheritence instantiation
    super(url, options, sprite);

    // movement management
    // jumper mode
    options?.movement === 'jumper'
      ? window.requestAnimationFrame(this.jumperHandler)
      : null;

    options?.movement === 'jumper'
      ? window.addEventListener('keydown', (event: KeyboardEvent) =>
          this.moveJumper(event.keyCode)
        )
      : null;

    // tiler mode
    options?.movement === 'tiler'
      ? window.addEventListener('keypress', (event: KeyboardEvent) =>
          this.moveTiler(event.keyCode)
        )
      : null;

    // directional movements
    switch (options?.movement) {
      case 'left': {
        this.moveLeftDirectional();
        break;
      }
      case 'right': {
        this.moveRightDirectional();
        break;
      }
      case 'top': {
        this.moveTopDirectional();
        break;
      }
      case 'bottom': {
        this.moveBottomDirectional();
        break;
      }
    }
  }

  // handle movement and movement directions
  moveTiler(keyCode: number): void {
    switch (keyCode) {
      case 119: {
        this.moveTilerUp();
        break;
      }
      case 115: {
        this.moveTilerDown();
        break;
      }
      case 100: {
        this.moveTilerRight();
        break;
      }
      case 97: {
        this.moveTilerLeft();
        break;
      }
    }
  }

  moveTilerUp() {
    let currentX: number = this.getCurrentX();
    let currentY: number = this.getCurrentY();
    if (this.isBound && currentY < 0) return;
    this.sprite.style.translate = `${currentX}px ${currentY - this.speed}px`;
  }

  moveTilerDown() {
    let currentX: number = this.getCurrentX();
    let currentY: number = this.getCurrentY();
    let heigth: number = this.getCurrentHeight();
    if (this.isBound && currentY > window.innerHeight - heigth) return;
    this.sprite.style.translate = `${currentX}px ${currentY + this.speed}px`;
  }

  moveTilerRight() {
    let currentX: number = this.getCurrentX();
    let currentY: number = this.getCurrentY();
    let width: number = this.getCurrentWidth();
    if (this.isBound && currentX > window.innerWidth - width) return;
    this.sprite.style.translate = `${currentX + this.speed}px ${currentY}px`;
  }

  moveTilerLeft() {
    let currentX: number = this.getCurrentX();
    let currentY: number = this.getCurrentY();
    if (this.isBound && currentX < 0) return;
    this.sprite.style.translate = `${currentX - this.speed}px ${currentY}px`;
  }

  // handle jumping movement mode mechanics
  jumperHandler = () => {
    let currentX: number = this.getCurrentX();
    let currentY: number = this.getCurrentY();
    let height: number = this.getCurrentHeight();

    // has hit the ground ? (can it jump now ?)
    if (currentY >= window.innerHeight - height) {
      this.canJump = true;
    }

    // not is jump mode, not under ground
    if (currentY < window.innerHeight - height && !this.isJumping) {
      this.canJump = false;
      this.sprite.style.translate = `${currentX}px ${
        currentY + this.gravity
      }px`;
    }
    window.requestAnimationFrame(this.jumperHandler);
  };

  moveJumper(keyCode: number): void {
    switch (keyCode) {
      case 32: {
        if (this.canJump) {
          this.isJumping = true;
          this.jumpJumper();
        }
        break;
      }
    }
  }

  jumpJumper = () => {
    let currentX: number = this.getCurrentX();
    let currentY: number = this.getCurrentY();

    if (this.jumpHeightTracker < this.jumpHeightLimit) {
      this.jumpHeightTracker += this.jumpPower;
      this.sprite.style.translate = `${currentX}px ${
        currentY - this.jumpPower
      }px`;

      window.requestAnimationFrame(this.jumpJumper);
    } else {
      // jumping is done
      this.isJumping = false;
      this.jumpHeightTracker = 0;
    }
  };

  // handle directional movements
  moveLeftDirectional = () => {
    let currentX: number = this.getCurrentX();
    let currentY: number = this.getCurrentY();
    this.sprite.style.translate = `${currentX - this.speed}px ${currentY}px`;
    window.requestAnimationFrame(this.moveLeftDirectional);
  };

  moveRightDirectional = () => {
    let currentX: number = this.getCurrentX();
    let currentY: number = this.getCurrentY();
    this.sprite.style.translate = `${currentX + this.speed}px ${currentY}px`;
    window.requestAnimationFrame(this.moveRightDirectional);
  };

  moveTopDirectional = () => {
    let currentX: number = this.getCurrentX();
    let currentY: number = this.getCurrentY();
    this.sprite.style.translate = `${currentX}px ${currentY - this.speed}px`;
    window.requestAnimationFrame(this.moveTopDirectional);
  };

  moveBottomDirectional = () => {
    let currentX: number = this.getCurrentX();
    let currentY: number = this.getCurrentY();
    this.sprite.style.translate = `${currentX}px ${currentY + this.speed}px`;
    window.requestAnimationFrame(this.moveBottomDirectional);
  };
}

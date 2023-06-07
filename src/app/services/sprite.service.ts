export default class Sprite {
  constructor(
    public url: string,
    public options?: {
      height?: number;
      width?: number;
      isFullScreen?: boolean;
      x?: number;
      y?: number;
      right?: number;
      left?: number;
      top?: number;
      bottom?: number;
    },
    public sprite?: any
  ) {
    // craete and instantiate the container element
    this.sprite = document.createElement('img');
    url = `assets/${url}`;
    this.sprite.setAttribute('src', url);
    this.sprite.style.position = 'absolute';
    this.sprite.style.inset = '0';

    // final appending process
    document.body.appendChild(this.sprite);

    // options
    let currentX: number = this.getCurrentX();
    let currentY: number = this.getCurrentY();

    options?.isFullScreen ? (options!.width = window.innerWidth) : null;
    options?.isFullScreen ? (options!.height = window.innerHeight) : null;

    options?.height ? (this.sprite.style.height = `${options.height}px`) : null;
    options?.width ? (this.sprite.style.width = `${options.width}px`) : null;

    options?.x
      ? (this.sprite.style.translate = `${options.x}px ${currentY}`)
      : null;
    options?.y
      ? (this.sprite.style.translate = `${currentX}px ${options.y}`)
      : null;

    // order of modification
    currentX = this.getCurrentX();
    currentY = this.getCurrentY();
    let currentHeight: number = this.getCurrentHeight();
    let currentWidth: number = this.getCurrentWidth();

    options?.right || options?.right === 0
      ? (this.sprite.style.translate = `${
          window.innerWidth - options.right - currentWidth
        }px ${currentY}px`)
      : null;

    currentX = this.getCurrentX();
    currentY = this.getCurrentY();
    options?.left || options?.left === 0
      ? (this.sprite.style.translate = `${options.left}px ${currentY}px`)
      : null;

    currentX = this.getCurrentX();
    currentY = this.getCurrentY();
    options?.top || options?.top === 0
      ? (this.sprite.style.translate = `${currentX}px ${options.top}px`)
      : null;

    currentX = this.getCurrentX();
    currentY = this.getCurrentY();
    options?.bottom || options?.bottom === 0
      ? (this.sprite.style.translate = `${currentX}px ${
          window.innerHeight - options.bottom - currentHeight
        }px`)
      : null;
  }

  //data getters
  getCurrentX(): number {
    let currentX: number = this.sprite?.getClientRects()[0].x || 0;
    return currentX;
  }

  getCurrentY(): number {
    let currentY: number = this.sprite?.getClientRects()[0].y || 0;
    return currentY;
  }

  getCurrentHeight(): number {
    let currentHeight: number = this.sprite?.getClientRects()[0].height || 0;
    return currentHeight;
  }

  getCurrentWidth(): number {
    let currentWidth: number = this.sprite?.getClientRects()[0].width || 0;
    return currentWidth;
  }
}

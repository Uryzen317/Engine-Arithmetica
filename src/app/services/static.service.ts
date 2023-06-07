import Sprite from './sprite.service';

export default class Static extends Sprite {
  isFullScreen: boolean = false;

  constructor(
    // passing arguments
    url: string,
    options?: {
      height?: number;
      width?: number;
      isFullScreen?: boolean;
    },
    sprite?: any
  ) {
    // proper inheritence instantiation
    super(url, options, sprite);
  }
}

import type { ScrolliumProps } from "../../react-intergation/types";
import { ScrolliumDirection } from "../types";

class ScrollModule {
  id: string;
  throttle: number;
  scrollPosition: number;
  isTop: boolean = true;
  isBottom: boolean = false;
  clientHeight!: number;
  scrollHeight!: number;
  progress!: number;
  element!: HTMLElement;
  direction: ScrolliumDirection = ScrolliumDirection.NONE;
  constructor({ id, throttle }: ScrolliumProps) {
    this.id = id;
    this.throttle = throttle || 50;
    this.scrollPosition = 0;
    this.progress = 0;
    this.direction = ScrolliumDirection.NONE;
  }
}

export { ScrollModule };

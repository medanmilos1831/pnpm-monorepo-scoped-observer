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
    this.throttle = throttle || 100;
    this.scrollPosition = 0;
    this.progress = 0;
    this.direction = ScrolliumDirection.NONE;
  }

  calucate = () => {
    if (this.scrollPosition === 0) {
      this.isTop = true;
      this.isBottom = false;
    }
    if (this.scrollPosition === this.scrollHeight) {
      this.isBottom = true;
      this.isTop = false;
    }
    if (this.scrollPosition > 0 && this.scrollPosition < this.scrollHeight) {
      this.isTop = false;
      this.isBottom = false;
    }
    const ratio =
      this.scrollHeight > 0 ? this.scrollPosition / this.scrollHeight : 0;
    const progress = Number((ratio * 100).toFixed(2));
    this.progress = Math.min(100, Math.max(1, progress));
  };
}

export { ScrollModule };

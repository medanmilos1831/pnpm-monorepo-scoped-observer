import { ScrolliumDirection } from "../types";

class ScrollModule {
  id: string;
  scrollPosition: number;
  isTop: boolean = true;
  isBottom: boolean = false;
  clientHeight!: number;
  scrollHeight!: number;
  progress!: number;
  element!: HTMLElement;
  direction: ScrolliumDirection = ScrolliumDirection.NONE;
  constructor({ id }: { id: string }) {
    this.id = id;
    this.scrollPosition = 0;
    this.progress = 0;
    this.direction = ScrolliumDirection.NONE;
  }
}

export { ScrollModule };

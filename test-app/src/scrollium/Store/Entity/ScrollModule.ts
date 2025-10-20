class ScrollModule {
  id: string;
  scrollPosition: number;
  isTop: boolean = true;
  isBottom: boolean = false;
  clientHeight!: number;
  scrollHeight!: number;
  constructor({ id }: { id: string }) {
    this.id = id;
    this.scrollPosition = 0;
  }
}

export { ScrollModule };

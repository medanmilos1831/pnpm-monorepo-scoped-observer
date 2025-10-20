class ScrollModule {
  id: string;
  scrollPosition: number;
  constructor({ id }: { id: string }) {
    this.id = id;
    this.scrollPosition = 0;
  }
}

export { ScrollModule };

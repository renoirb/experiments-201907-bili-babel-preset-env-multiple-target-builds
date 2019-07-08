export interface AlphaInterface {
  readonly name: string
  age: number
}

export class Alpha implements AlphaInterface {
  public age: number = 0
  constructor(public readonly name: string) {}
}

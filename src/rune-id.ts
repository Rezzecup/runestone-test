export class RuneId {
  block: number
  tx: number
  constructor(block: number, tx: number) {
    if (block === 0 && tx > 0)
      throw new Error('Invalid RuneId')
    this.block = block
    this.tx = tx
  }

  static fromString(input: string): RuneId {
    return new RuneId(Number(input.split(':')[0]), Number(input.split(':')[1]))
  }

  delta(next: RuneId): [number, number] {
    const block = next.block - this.block

    let tx: number
    if (block === 0)
      tx = next.tx - this.tx
    else
      tx = next.tx

    return [block, tx]
  }

  next(block: number, tx: number): RuneId {
    const newBlock = this.block + block
    let newTx: number
    if (block === 0)
      newTx = this.tx + tx
    else
      newTx = tx

    return new RuneId(newBlock, newTx)
  }
}

export class RuneId {
  block: bigint
  tx: bigint
  constructor(block: bigint, tx: bigint) {
    block = BigInt(block)
    tx = BigInt(tx)
    if (block === 0n && tx > 0n)
      throw new Error('Invalid RuneId')
    this.block = block
    this.tx = tx
  }

  delta(next: RuneId): [bigint, bigint] {
    const block = next.block - this.block

    let tx: number | bigint
    if (block === 0n)
      tx = next.tx - this.tx
    else
      tx = next.tx

    return [BigInt(block), BigInt(tx)]
  }

  next(block: bigint, tx: bigint): RuneId {
    const newBlock = this.block + block
    let newTx: bigint
    if (block === BigInt(0))
      newTx = this.tx + tx
    else
      newTx = tx

    return new RuneId(newBlock, newTx)
  }
}

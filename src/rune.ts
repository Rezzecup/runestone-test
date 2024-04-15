import { base26 } from './utils'

export class Rune {
  n = 0n

  constructor(n: bigint | string) {
    if (typeof n === 'string')
      this.n = base26(n.replace(/•/g, '').replace(/\./g, '')) // remove all dots and middots
    else
      this.n = n
  }
}

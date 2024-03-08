import type { Rune } from './rune'

export interface Edict {
  id: bigint
  amount: bigint
  output: bigint
}

export interface Edict {
  id: bigint
  amount: bigint
  output: bigint
}

export interface Mint {
  deadline?: number
  limit?: bigint
  term?: number
}

export interface Etching {
  divisibility: number
  mint?: Mint
  rune?: Rune
  spacers: number
  symbol?: string
}

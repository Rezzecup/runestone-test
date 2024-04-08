import type { RuneId } from './rune-id'
import type { Rune } from './rune'

export interface Edict {
  id: RuneId
  amount: bigint
  output: bigint
}

export interface Mint {
  deadline?: number
  limit?: bigint
  term?: number
}
export interface Terms {
  amount?: bigint
  cap?: bigint
  height: [number | undefined, number | undefined]
  offset: [number | undefined, number | undefined]
}

export interface Etching {
  divisibility: number
  mint?: Mint
  rune?: Rune
  premine?: bigint
  spacers: number
  symbol?: string
  terms?: Terms
}

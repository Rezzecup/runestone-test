import { bytesToHex } from './utils'
import { encodeToVec } from './varint'

export enum Tag {
  Body = 0,
  Flags = 2,
  Rune = 4,
  Premine = 6,
  Cap = 8,
  Amount = 10,
  HeightStart = 12,
  HeightEnd = 14,
  OffsetStart = 16,
  OffsetEnd = 18,
  Mint = 20,
  Pointer = 22,
  Cenotaph = 126,

  Divisibility = 1,
  Spacers = 3,
  Symbol = 5,
  Nop = 127,
}

export function takeTag(tag: Tag, fields: { [key: number]: number }) {
  delete fields[tag]
  return fields
}

export function encodeTag(tag: Tag, payload: Uint8Array, values?: (bigint | number | undefined)[] | string) {
  let v = payload
  if (typeof values === 'string') {
    const encoder = new TextEncoder()
    values = [BigInt(bytesToHex(encoder.encode(values)))]
  }
  if (!values || values.filter(x => x !== undefined).length === 0)
    return v
  for (const value of values) {
    v = encodeToVec(BigInt(tag), v)
    v = encodeToVec(value!, v)
  }
  return v
}

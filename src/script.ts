import { Opcodes } from './opcodes'
import type { ScriptData } from './type'
import { bytesToHex } from './utils'

/// Code forked from https://github.com/cmdruid/buff

const MAX_WORD_SIZE = 0x208

function num_size(
  num: number,
): number {
  // 1 byte.
  if (num <= 0xFF)
    return 1
  // 2 bytes.
  if (num <= 0xFFFF)
    return 2
  // 4 bytes.
  if (num <= 0xFFFFFFFF)
    return 4
  throw new TypeError('Numbers larger than 4 bytes must specify a fixed size!')
}

export function numToBytes(
  num: number,
  size?: number,
): Uint8Array {
  if (size === undefined)
    size = num_size(num)
  const buffer = new ArrayBuffer(size)
  const dataView = new DataView(buffer)
  let offset = 0
  while (num > 0) {
    const byte = num & 255
    dataView.setUint8(offset++, num)
    num = (num - byte) / 256
  }
  return new Uint8Array(buffer)
}

function encodeSize(size: number): Uint8Array {
  switch (true) {
    case (size <= 0x4B):
      return new Uint8Array([size])
    case (size > 0x4B && size < 0x100):
      return new Uint8Array([Opcodes.OP_DATAPUSH1, ...numToBytes(size, 1)])
    case (size >= 0x100 && size <= MAX_WORD_SIZE):
      return new Uint8Array([Opcodes.OP_DATAPUSH2, ...numToBytes(size, 2)])
    default:
      throw new Error(`Invalid word size:${size.toString()}`)
  }
}
export function encodeScript(scriptData: ScriptData[]) {
  const encodedScript: Uint8Array[] = []
  for (const script of scriptData) {
    if (typeof script === 'string') {
      encodedScript.push(Uint8Array.from([Opcodes[script]]))
    }
    else {
      if (script.length > MAX_WORD_SIZE) {
        const words = []
        for (let i = 0; i < script.length; i += MAX_WORD_SIZE)
          words.push(script.slice(i, i + MAX_WORD_SIZE))
        for (const word of words) {
          encodedScript.push(encodeSize(word.length))
          encodedScript.push(Uint8Array.from(word))
        }
      }
      else {
        encodedScript.push(encodeSize(script.length))
        encodedScript.push(script)
      }
    }
  }
  return bytesToHex(encodedScript.reduce((acc, val) => new Uint8Array([...acc, ...val]), new Uint8Array()), false)
}

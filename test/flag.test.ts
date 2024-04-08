import { describe, expect, it } from 'vitest'
import { Flag, maskFlag, setFlag, takeFlag } from '../src/flag'

describe('flag test', () => {
  it('mask', () => {
    expect(maskFlag(Flag.Etching)).toEqual(0b1)
    expect(maskFlag(Flag.Cenotaph)).toEqual(1 << 127)
  })
  it('take', () => {
    const { flags } = takeFlag(Flag.Etching, 1)
    expect(flags).toEqual(0)
    const { flags: f } = takeFlag(Flag.Etching, 0)
    expect(f).toEqual(0)
  })
  it('set', () => {
    expect(setFlag(Flag.Etching, 0)).toEqual(1)
  })
})

import { describe, expect, it } from 'vitest'
import { Flag, mask, set, take } from '../src/flag'

describe('flag test', () => {
  it('mask', () => {
    expect(mask(Flag.Etch)).toEqual(0b1)
    expect(mask(Flag.Burn)).toEqual(1 << 127)
  })
  it('take', () => {
    const { flags } = take(Flag.Etch, 1)
    expect(flags).toEqual(0)
    const { flags: f } = take(Flag.Etch, 0)
    expect(f).toEqual(0)
  })
  it('set', () => {
    expect(set(Flag.Etch, 0)).toEqual(1)
  })
})

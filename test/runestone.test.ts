import { describe, expect, it } from 'vitest'
import { Runestone } from '../src/runestone'
import { Rune } from '../src/rune'
import { MAX_DIVISIBILITY, MAX_SPACERS } from '../src/contants'
import { RuneId } from '../src/rune-id'

describe('runestone test', () => {
  it('runestone', () => {
    let runestone = new Runestone(
      {
        etching: {
          rune: new Rune(0n),
        },
      },
    )
    let script = runestone.encipher()
    expect(script).toBe('6a5d0402010400')

    runestone = new Runestone(
      {
        etching: {
          rune: new Rune(0n),
          divisibility: MAX_DIVISIBILITY,
        },
      },
    )
    script = runestone.encipher()
    expect(script).toBe('6a5d06020104000126')

    runestone = new Runestone(
      {
        etching: {
          rune: new Rune(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn),
        },
      },
    )
    script = runestone.encipher()
    expect(script).toBe('6a5d16020104ffffffffffffffffffffffffffffffffffff03')

    runestone = new Runestone(
      {
        edicts: [
          {
            amount: 0n,
            id: new RuneId(0, 0),
            output: 0n,
          },
        ],
        etching: {
          rune: new Rune(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn),
          divisibility: MAX_DIVISIBILITY,
        },
      },
    )
    script = runestone.encipher()
    expect(script).toBe('6a5d1d020104ffffffffffffffffffffffffffffffffffff0301260000000000')

    runestone = new Runestone(
      {
        edicts: [
          {
            amount: 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn,
            id: new RuneId(0, 0),
            output: 0n,
          },
        ],
        etching: {
          rune: new Rune(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn),
          divisibility: MAX_DIVISIBILITY,
        },
      },
    )
    script = runestone.encipher()
    expect(script).toBe('6a5d2f020104ffffffffffffffffffffffffffffffffffff030126000000ffffffffffffffffffffffffffffffffffff0300')

    runestone = new Runestone(
      {
        edicts: [
          {
            amount: 0n,
            id: new RuneId(1_000_000, 4294967295),
            output: 0n,
          },
        ],
      },
    )
    script = runestone.encipher()
    expect(script).toBe('6a5d0b00c0843dffffffff0f0000')

    runestone = new Runestone(
      {
        edicts: [
          {
            amount: 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn,
            id: new RuneId(1_000_000, 4294967295),
            output: 0n,
          },
        ],
      },
    )
    script = runestone.encipher()
    expect(script).toBe('6a5d1d00c0843dffffffff0fffffffffffffffffffffffffffffffffffff0300')

    runestone = new Runestone(
      {
        edicts: [
          {
            amount: 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn,
            id: new RuneId(1_000_000, 4294967295),
            output: 0n,
          },
          {
            amount: 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn,
            id: new RuneId(1_000_000, 4294967295),
            output: 0n,
          },
        ],
      },
    )
    script = runestone.encipher()
    expect(script).toBe('6a5d3300c0843dffffffff0fffffffffffffffffffffffffffffffffffff03000000ffffffffffffffffffffffffffffffffffff0300')

    runestone = new Runestone(
      {
        edicts: [
          {
            amount: 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn,
            id: new RuneId(1_000_000, 4294967295),
            output: 0n,
          },
          {
            amount: 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn,
            id: new RuneId(1_000_000, 4294967295),
            output: 0n,
          },
          {
            amount: 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn,
            id: new RuneId(1_000_000, 4294967295),
            output: 0n,
          },
        ],
      },
    )
    script = runestone.encipher()
    expect(script).toBe('6a5d4900c0843dffffffff0fffffffffffffffffffffffffffffffffffff03000000ffffffffffffffffffffffffffffffffffff03000000ffffffffffffffffffffffffffffffffffff0300')

    runestone = new Runestone(
      {
        etching: {
          divisibility: MAX_DIVISIBILITY,
          terms: {
            cap: 4294967295n,
            amount: 18446744073709551615n,
            height: [4294967295, 4294967295],
            offset: [4294967295, 4294967295],
          },
          premine: 18446744073709551615n,
          rune: new Rune(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn),
          symbol: 'h',
          spacers: MAX_SPACERS,
        },
      },
    )
    script = runestone.encipher()
    expect(script).toBe('6a5d4c53020304ffffffffffffffffffffffffffffffffffff03012603ffffff3f056806ffffffffffffffffff010affffffffffffffffff0108ffffffff0f0cffffffff0f0effffffff0f10ffffffff0f12ffffffff0f')
  })
})

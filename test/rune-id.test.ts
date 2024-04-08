import { describe, expect, it } from 'vitest'

import { RuneId } from '../src/rune-id'

// Assuming RuneId is exported from a file named RuneId.ts

describe('runeId tests', () => {
  it('delta', () => {
    const expected: RuneId[] = [
      new RuneId(4n, 2n),
      new RuneId(1n, 2n),
      new RuneId(1n, 1n),
      new RuneId(3n, 1n),
      new RuneId(2n, 0n),
    ]

    expected.sort((a, b) => Number(a.block - b.block) || Number(a.tx - b.tx))

    expect(expected).toEqual([
      new RuneId(1n, 1n),
      new RuneId(1n, 2n),
      new RuneId(2n, 0n),
      new RuneId(3n, 1n),
      new RuneId(4n, 2n),
    ])

    let previous = new RuneId(0n, 0n)
    const deltas: [bigint, bigint][] = []
    for (const id of expected) {
      deltas.push(previous.delta(id)) // Assuming delta method exists on RuneId
      previous = id
    }

    expect(deltas).toEqual([[1n, 1n], [0n, 1n], [1n, 0n], [1n, 1n], [1n, 2n]])

    previous = new RuneId(0n, 0n)
    const actual: RuneId[] = []
    for (const [block, tx] of deltas) {
      const next = previous.next(block, tx) // Assuming next method exists on RuneId
      actual.push(next)
      previous = next
    }

    expect(actual).toEqual(expected)
  })
})

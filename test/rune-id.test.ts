import { describe, expect, it } from 'vitest'

import { RuneId } from '../src/rune-id'

// Assuming RuneId is exported from a file named RuneId.ts

describe('runeId tests', () => {
  it('delta', () => {
    const expected: RuneId[] = [
      new RuneId(4, 2),
      new RuneId(1, 2),
      new RuneId(1, 1),
      new RuneId(3, 1),
      new RuneId(2, 0),
    ]

    expected.sort((a, b) => Number(a.block - b.block) || Number(a.tx - b.tx))

    expect(expected).toEqual([
      new RuneId(1, 1),
      new RuneId(1, 2),
      new RuneId(2, 0),
      new RuneId(3, 1),
      new RuneId(4, 2),
    ])

    let previous = new RuneId(0, 0)
    const deltas: [number, number][] = []
    for (const id of expected) {
      deltas.push(previous.delta(id)) // Assuming delta method exists on RuneId
      previous = id
    }

    expect(deltas).toEqual([[1, 1], [0, 1], [1, 0], [1, 1], [1, 2]])

    previous = new RuneId(0, 0)
    const actual: RuneId[] = []
    for (const [block, tx] of deltas) {
      const next = previous.next(block, tx) // Assuming next method exists on RuneId
      actual.push(next)
      previous = next
    }

    expect(actual).toEqual(expected)
  })
})

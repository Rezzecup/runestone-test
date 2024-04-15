import { describe, expect, it } from 'vitest'
import { base26, spacersFromName } from '../src/utils'

describe('utils', () => {
  it('base 26', () => {
    let result = base26('A')
    expect(result).toBe(0n)

    result = base26('BA')
    expect(result).toBe(52n)
  })
  it('spacer from name', () => {
    let result = spacersFromName('A•AAA')
    expect(result).toBe(1)
    result = spacersFromName('A•A•A')
    expect(result).toBe(3)
    result = spacersFromName('AA•AA')
    expect(result).toBe(2)
    result = spacersFromName('A•A•A•A')
    expect(result).toBe(7)
  })
})

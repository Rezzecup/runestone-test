import { expect, it } from 'vitest'
import { Tag, encodeTag } from '../src/tag'

it('tag encode', () => {
  const payload: Uint8Array = new Uint8Array(0)
  let result = encodeTag(Tag.Flags, payload, [3])
  expect(result).toEqual(Uint8Array.from([2, 3]))

  result = encodeTag(Tag.Rune, result, [5])
  expect(result).toEqual(Uint8Array.from([2, 3, 4, 5]))

  result = encodeTag(Tag.Rune, result, [5, 6])
  expect(result).toEqual(Uint8Array.from([2, 3, 4, 5, 4, 5, 4, 6]))
})

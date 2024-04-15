import { Flag, setFlag } from './flag'
import type { Edict, Etching } from './type'
import { RuneId } from './rune-id'
import { Tag, encodeTag } from './tag'
import { encodeToVec } from './varint'
import { encodeScript } from './script'

export class Runestone {
  burn = false
  claim = 0n
  default_output = 0n
  edicts: Edict[]
  etching?: Etching
  mint?: RuneId
  pointer?: number

  constructor({ edicts, etching, pointer, mint }: { edicts?: Edict[], etching?: Etching, pointer?: number, mint?: RuneId }) {
    this.edicts = edicts ?? []
    this.etching = etching
    this.pointer = pointer
    this.mint = mint
  }

  encipher(): string {
    let payload = new Uint8Array(0)
    if (this.etching !== undefined) {
      let flags = 0
      flags = setFlag(Flag.Etching, flags)
      if (this.etching.terms)
        flags = setFlag(Flag.Terms, flags)

      payload = encodeTag(Tag.Flags, payload, [flags])
      payload = encodeTag(Tag.Rune, payload, [this.etching.rune?.n])
      payload = encodeTag(Tag.Divisibility, payload, [this.etching.divisibility])
      payload = encodeTag(Tag.Spacers, payload, [this.etching.spacers])
      payload = encodeTag(Tag.Symbol, payload, this.etching.symbol)
      payload = encodeTag(Tag.Premine, payload, [this.etching.premine])

      if (this.etching.terms) {
        payload = encodeTag(Tag.Amount, payload, [this.etching.terms.amount])
        payload = encodeTag(Tag.Cap, payload, [this.etching.terms.cap])
        payload = encodeTag(Tag.HeightStart, payload, [this.etching.terms?.height[0]])
        payload = encodeTag(Tag.HeightEnd, payload, [this.etching.terms.height[1]])
        payload = encodeTag(Tag.OffsetStart, payload, [this.etching.terms.offset[0]])
        payload = encodeTag(Tag.OffsetEnd, payload, [this.etching.terms.offset[1]])
      }
    }
    if (this.mint)
      payload = encodeTag(Tag.Mint, payload, [this.mint.block, this.mint.tx])
    payload = encodeTag(Tag.Pointer, payload, [this.pointer])
    if (this.edicts && this.edicts?.length > 0) {
      payload = encodeToVec(Tag.Body, payload)
      const edictsClone = this.edicts.sort((a, b) => Number(a.id.block - b.id.block)).sort((a, b) => Number(a.id.tx - b.id.tx))
      let previous = new RuneId(0, 0)
      for (const edict of edictsClone) {
        const [block, tx] = previous.delta(edict.id)
        payload = encodeToVec(block, payload)
        payload = encodeToVec(tx, payload)
        payload = encodeToVec(edict.amount, payload)
        payload = encodeToVec(edict.output, payload)
        previous = edict.id
      }
    }
    return encodeScript(['OP_RETURN', 'OP_13', payload])
  }
}

import { Script } from '@cmdcode/tapscript'
import { Opcodes } from './opcodes'
import { Flag, setFlag } from './flag'
import type { Edict, Etching } from './type'
import { RuneId } from './rune-id'
import { Tag, encodeTag } from './tag'
import { encodeToVec } from './varint'

export const MAGIC_NUMBER = Opcodes.OP_PUSHNUM_13
export const COMMIT_INTERVAL = 6
export class RuneStone {
  burn = false
  claim = 0n
  default_output = 0n
  edicts?: Edict[] = []
  etching?: Etching
  mint?: RuneId
  pointer?: bigint

  constructor(edicts: Edict[], etching: Etching) {
    this.edicts = edicts
    this.etching = etching
  }

  encipher(): Uint8Array {
    let payload = new Uint8Array(0)
    if (this.etching !== undefined) {
      const flags = 0
      setFlag(Flag.Etching, flags)
      if (this.etching.terms)
        setFlag(Flag.Terms, flags)

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
      const previous = new RuneId(0n, 0n)
      for (const edict of edictsClone) {
        const [block, tx] = previous.delta(edict.id)
        payload = encodeToVec(block, payload)
        payload = encodeToVec(tx, payload)
        payload = encodeToVec(edict.amount, payload)
        payload = encodeToVec(edict.output, payload)
      }
    }

    const scriptData = [
      Opcodes.OP_RETURN,
      MAGIC_NUMBER,
      payload,
    ]
    return Script.encode(scriptData).toHex()
  }
}

import type { Edict, Etching } from './type'

export class RuneStone {
  burn = false
  claim = BigInt(0)
  default_output = BigInt(0)
  edicts?: Edict[] = []
  etching?: Etching

  constructor(edicts: Edict[], etching: Etching) {
    this.edicts = edicts
    this.etching = etching
  }

  enciper() {

  }
}

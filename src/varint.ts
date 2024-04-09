export function decodeToVec(n: number): Uint8Array {
  const out = new Uint8Array(19)
  let i = 18
  const bytes = new Uint8Array(new Int32Array([n]).buffer)
  out[i] = bytes[0] & 0b0111_1111

  while (n > 0b0111_1111) {
    n = n / 128 - 1
    i -= 1
    const bytes = new Uint8Array(new Int32Array([n]).buffer)
    out[i] = bytes[0] | 0b1000_0000
  }
  return out.slice(i)
}

export function encodeToVec(n: bigint | number, v: Uint8Array): Uint8Array {
  const r = Array.from(v).map(x => BigInt(x))
  n = BigInt(n)
  while (n >> 7n > 0) {
    r.push(n & 0b0111_1111n | 0b1000_0000n)
    n >>= 7n
  }
  r.push(n & 0b0111_1111n)
  return new Uint8Array(r.map(x => Number(x)))
}

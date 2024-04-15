export function hexToBytes(input: string): Uint8Array {
  if (input.startsWith('0x'))
    input = input.slice(2)
  const bytes = new Uint8Array(input.length / 2)
  for (let i = 0; i < input.length; i += 2)
    bytes[i / 2] = Number.parseInt(input.slice(i, i + 2), 16)

  return bytes
}

export function bytesToHex(input: Uint8Array, withPrefix = true): string {
  return `${withPrefix ? '0x' : ''}${Array.from(input).map(x => x.toString(16).padStart(2, '0')).join('')}`
}

export function base26(n: string): bigint {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = 0n
  let i = 0
  while (i < n.length) {
    let value = BigInt(alphabet.indexOf(n[i]))
    if (i < n.length - 1)
      value += 1n

    result += value * (26n ** BigInt(n.length - i - 1))
    i++
  }
  return result
}

export function spacersFromName(name: string): number {
  let spacers = 0
  let length = 0
  for (let i = 0; i < name.length; i++) {
    const char = name[i]
    if (/[A-Z]/.test(char)) {
      length += 1
    }
    else {
      if (char === '.' || char === '•')
        spacers |= 1 << (length - 1)
    }
  }
  return spacers
}

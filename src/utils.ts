export function hexToBytes(input: string): Uint8Array {
  if (input.startsWith('0x'))
    input = input.slice(2)
  const bytes = new Uint8Array(input.length / 2)
  for (let i = 0; i < input.length; i += 2)
    bytes[i / 2] = Number.parseInt(input.slice(i, i + 2), 16)

  return bytes
}

export function bytesToHex(input: Uint8Array): string {
  return `0x${Array.from(input).map(x => x.toString(16).padStart(2, '0')).join('')}`
}

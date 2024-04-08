export enum Flag {
  Etching = 0,
  Terms = 1,
  // Burn
  Cenotaph = 127,
}

export function setFlag(flag: Flag, flags: number) {
  flags |= maskFlag(flag)
  return flags
}

export function maskFlag(flag: Flag): number {
  return 1 << flag
}

export function takeFlag(flag: Flag, flags: number) {
  const m = maskFlag(flag)
  const set = (flags & m) !== 0
  flags &= ~m
  return {
    flags,
    set,
  }
}

# @utxone/runestone

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]

Runestone implement in typescript.

## Usage

```
const runestone = new Runestone(
    {
        etching: {
            divisibility: MAX_DIVISIBILITY,
            terms: {
                cap: 4294967295n,
                amount: 18446744073709551615n,
                height: [4294967295, 4294967295],
                offset: [4294967295, 4294967295],
            },
            premine: 18446744073709551615n,
            rune: new Rune(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn),
            symbol: 'h',
            spacers: MAX_SPACERS,
        },
    },
)
const script = runestone.encipher()
```
## Develop

```
pnpm i
pnpm build

```

[npm-version-src]: https://img.shields.io/npm/v/@utxone/runestone?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@utxone/runestone
[license-src]: https://img.shields.io/github/license/utxone/runestone.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/utxone/runestone/blob/main/LICENSE

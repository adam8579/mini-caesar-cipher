# mini-caesar-cipher

A tiny, dependency-free Caesar cipher library for JavaScript (ESM).

```js
import { caesarEncrypt, caesarDecrypt } from './src/index.js';

caesarEncrypt('Hello, World!', 3); // 'Khoor, Zruog!'
caesarDecrypt('Khoor, Zruog!', 3); // 'Hello, World!'
```

## Why this exists

The Caesar cipher is a classic teaching tool, but most snippets online either
ignore case, break on non-letters, or mishandle negative shifts. This library
handles all of those correctly with a minimal, readable implementation. The
trade-off is that it only supports the 26-letter English alphabet; it does not
try to be a general substitution cipher.

## Edge cases

- Only ASCII letters (`A-Z`, `a-z`) are shifted. Digits, punctuation, and
  whitespace pass through unchanged.
- Negative shifts are supported and wrap around the alphabet.
- Shifts larger than 26 (or smaller than -26) are reduced modulo 26.
- Fractional shifts are truncated toward zero.
- Passing a non-string `text` or a non-finite `shift` throws a `TypeError`.

## Performance

The window keeps a bounded buffer, so `push` is constant time and memory does not
grow with the length of the stream. `peak` and `trough` are linear in the window
size, which is the trade that keeps `push` cheap.


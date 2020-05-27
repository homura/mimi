const en = new Map<string, string>([['0', '\u200c'], ['1', '\u200d']]);
const de = new Map<string, string>([['\u200c', '0'], ['\u200d', '1']]);

function invariant(available: boolean, message: string) {
  if (available) return;
  throw new Error(message)
}

export function textToZeroWidthBinary(text: string) {
  const encoder = new TextEncoder();
  return Array.from(encoder.encode(text))
    .map(n =>
      n.toString(2).padStart(8, '0').split('').map(b => en.get(b)).join('')
    )
    .join('');
}

export function zeroWidthBinaryToText(bin: string | string[]) {
  const binaries = Array.from(bin)
    .reduce((u8arr, ch, i) => {
      ch = de.get(ch);
      if (i % 8 !== 0) {
        u8arr[u8arr.length - 1] += ch;
      } else {
        u8arr.push(ch);
      }
      return u8arr;
    }, [])
    .map(u8str => parseInt(u8str, 2));
  const decoder = new TextDecoder();
  return decoder.decode(Uint8Array.from(binaries));
}

export function encode(display: string, secret: string) {
  invariant(display.length >= 2, 'display length should more than 2');

  const isEncoded = display.split('').some(ch => de.has(ch));
  invariant(!isEncoded, 'can not re-encode message');

  const encoded = textToZeroWidthBinary(secret);
  const [head, ...tail] = Array.from(display);
  return head + encoded + tail.join('');
}

export function decode(encoded: string) {
  const zeroWidthBinaries = Array.from(encoded).filter(ch => de.has(ch));

  if (zeroWidthBinaries.length < 1) {
    throw new Error(`argument ${encoded} is not an encoded text`);
  }

  return zeroWidthBinaryToText(zeroWidthBinaries);
}

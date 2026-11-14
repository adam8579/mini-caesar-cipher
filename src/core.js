/**
 * Caesar cipher implementation.
 *
 * The cipher shifts each letter by a fixed number of positions through the
 * alphabet, wrapping around at the ends. Only ASCII letters are transformed;
 * all other characters are passed through unchanged.
 *
 * Design choice: the shift is applied modulo 26, and negative shifts are
 * supported. For example, a shift of -1 is equivalent to a shift of 25.
 * This keeps the API flexible and matches the mathematical definition of
 * the Caesar cipher.
 *
 * Case is preserved: uppercase letters remain uppercase, lowercase remain
 * lowercase. Non-alphabetic characters are never shifted.
 */

const ALPHABET_LENGTH = 26;

/**
 * Shift a single character by the given amount, preserving case.
 *
 * @param {string} char - A single character.
 * @param {number} shift - Number of positions to shift (can be negative).
 * @returns {string} The shifted character, or the original if not a letter.
 */
function shiftChar(char, shift) {
  const code = char.charCodeAt(0);
  let base;
  if (code >= 65 && code <= 90) {
    base = 65; // 'A'
  } else if (code >= 97 && code <= 122) {
    base = 97; // 'a'
  } else {
    return char;
  }
  // Normalize shift into [0, 25] to avoid repeated modulo on negative numbers.
  const normalized = ((shift % ALPHABET_LENGTH) + ALPHABET_LENGTH) % ALPHABET_LENGTH;
  const offset = code - base;
  const shifted = (offset + normalized) % ALPHABET_LENGTH;
  return String.fromCharCode(base + shifted);
}

/**
 * Encipher a plaintext string using the Caesar cipher.
 *
 * @param {string} text - The text to encipher.
 * @param {number} shift - The number of positions to shift each letter.
 * @returns {string} The enciphered text.
 * @throws {TypeError} If text is not a string or shift is not a finite number.
 */
export function caesarEncrypt(text, shift) {
  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }
  if (typeof shift !== 'number' || !Number.isFinite(shift)) {
    throw new TypeError('shift must be a finite number');
  }
  // Truncate fractional shifts toward zero; the cipher is defined on integers.
  const intShift = Math.trunc(shift);
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += shiftChar(text[i], intShift);
  }
  return result;
}

/**
 * Decipher a Caesar cipher string.
 *
 * Deciphering is equivalent to enciphering with the negated shift.
 *
 * @param {string} text - The ciphertext to decipher.
 * @param {number} shift - The number of positions used during enciphering.
 * @returns {string} The deciphered plaintext.
 * @throws {TypeError} If text is not a string or shift is not a finite number.
 */
export function caesarDecrypt(text, shift) {
  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }
  if (typeof shift !== 'number' || !Number.isFinite(shift)) {
    throw new TypeError('shift must be a finite number');
  }
  return caesarEncrypt(text, -shift);
}

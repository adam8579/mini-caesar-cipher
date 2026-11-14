import test from 'node:test';
import assert from 'node:assert/strict';
import { caesarEncrypt, caesarDecrypt } from '../src/index.js';

test('encrypts a simple lowercase word', () => {
  assert.equal(caesarEncrypt('hello', 3), 'khoor');
});

test('decrypts a simple lowercase word', () => {
  assert.equal(caesarDecrypt('khoor', 3), 'hello');
});

test('preserves case', () => {
  assert.equal(caesarEncrypt('Hello World', 3), 'Khoor Zruog');
});

test('wraps around the alphabet', () => {
  assert.equal(caesarEncrypt('xyz', 3), 'abc');
  assert.equal(caesarEncrypt('XYZ', 3), 'ABC');
});

test('handles negative shifts', () => {
  assert.equal(caesarEncrypt('abc', -3), 'xyz');
  assert.equal(caesarDecrypt('xyz', -3), 'abc');
});

test('shift of 0 returns the original text', () => {
  assert.equal(caesarEncrypt('Hello, World!', 0), 'Hello, World!');
});

test('shift of 26 returns the original text', () => {
  assert.equal(caesarEncrypt('Hello, World!', 26), 'Hello, World!');
});

test('large shifts are reduced modulo 26', () => {
  assert.equal(caesarEncrypt('abc', 29), 'def');
  assert.equal(caesarEncrypt('abc', -29), 'xyz');
});

test('leaves non-alphabetic characters unchanged', () => {
  assert.equal(caesarEncrypt('a1b2c3!@#', 1), 'b1c2d3!@#');
});

test('round-trips arbitrary text', () => {
  const original = 'The quick brown fox jumps over the lazy dog. 123';
  for (let shift = -5; shift <= 5; shift++) {
    assert.equal(caesarDecrypt(caesarEncrypt(original, shift), shift), original);
  }
});

test('throws on non-string text', () => {
  assert.throws(() => caesarEncrypt(123, 3), TypeError);
  assert.throws(() => caesarDecrypt(null, 3), TypeError);
});

test('throws on non-finite shift', () => {
  assert.throws(() => caesarEncrypt('abc', NaN), TypeError);
  assert.throws(() => caesarDecrypt('abc', Infinity), TypeError);
});

test('truncates fractional shifts', () => {
  assert.equal(caesarEncrypt('abc', 2.9), 'cde');
});

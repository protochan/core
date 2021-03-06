// This file is a part of the protochan project.
// https://github.com/sidmani/protochan
// https://www.sidmani.com/?postid=3

// Copyright (c) 2018 Sid Mani
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const tap = require('tap');
const Uint256 = require('../../src/core/util/uint256.js');

tap.test('Uint256', (t) => {
  const num = new Uint256(0xfff7aea9);
  const expectedArr = new Uint8Array(32);
  expectedArr[31] = 0xa9;
  expectedArr[30] = 0xae;
  expectedArr[29] = 0xf7;
  expectedArr[28] = 0xff;
  t.strictSame(num.array, expectedArr, 'Uint256 sets initial value');
  num.add(new Uint256(0x57));
  expectedArr[31] = 0x00;
  expectedArr[30] = 0xaf;
  t.strictSame(num.array, expectedArr, 'Uint256 adds other value (8bit)');

  num.add(new Uint256(0xffff));
  expectedArr[31] = 0xff;
  expectedArr[30] = 0xae;
  expectedArr[29] = 0xf8;
  expectedArr[28] = 0xff;
  t.strictSame(num.array, expectedArr, 'Uint256 adds other value (16bit)');

  num.add(new Uint256(0xffe9c7d5));
  expectedArr[31] = 0xd4;
  expectedArr[30] = 0x76;
  expectedArr[29] = 0xe2;
  expectedArr[28] = 0xff;
  expectedArr[27] = 0x01;
  t.strictSame(num.array, expectedArr, 'Uint256 adds other value (32bit)');

  t.strictSame((new Uint256(expectedArr)).array, num.array, 'Uint256 sets input array');

  const copy = num.copy();
  t.notEqual(num.array, copy.array, 'Uint256.copy returns deep copy of array');
  t.strictSame(num.array, copy.array, 'Uint256.copy returns identical duplicate');

  const exp77 = Uint256.exp2(77);
  const expected = new Uint8Array(32);
  expected[22] = 0b00100000;
  t.strictSame(exp77.array, expected, 'Uint256 correctly exponentiates 2');
  const exp78 = new Uint256();
  exp78.addExp2(77);
  exp78.addExp2(77);
  expected[22] = 0b01000000;
  t.strictSame(exp78.array, expected, 'Uint256 correctly adds exponent of 2');

  t.equal(new Uint256(0xffcbffce).compare(new Uint256(0xffccffce)), -1, 'Uint256.compare (less than)');
  t.equal(new Uint256(0xffcbffce).compare(new Uint256(0xffcbffce)), 0, 'Uint256.compare (equal)');
  t.equal(new Uint256(0xffcbffce).compare(new Uint256(0xffcaffce)), 1, 'Uint256.compare (greater than)');
  t.end();
});

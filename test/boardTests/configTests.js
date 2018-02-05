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
var common = require('../testCommon.js');
var Configuration = require('../../js/board/config.js');
var ErrorType = require('../../js/error.js');
var t = require('tap');

t.test('Configuration constructor', function(t) {
  t.throws(function() { new Configuration(new Array(12)); }, ErrorType.Parameter.type());
  let post = common.validGenesisPost();
  post.data[3] = 0xf5;
  post.data[4] = 0xf6;
  post.data[5] = 0xf7;
  post.data[6] = 0xf8;
  post.data[7] = 0xf9;
  post.header._data.setUint32(75, 0x18f3e974)
  let config = new Configuration(post);
  t.equal(config.MIN_POST_DIFFICULTY, 0xf5, 'Configuration sets minimum post difficulty');
  t.equal(config.MAX_POST_DIFFICULTY, 0xf6, 'Configuration sets maximum post difficulty');
  t.equal(config.MIN_THREAD_DIFFICULTY, 0xf7, 'Configuration sets min thread difficulty');
  t.equal(config.MAX_THREAD_DIFFICULTY, 0xf8, 'Configuration sets max thread difficulty');
  t.equal(config.MAX_THREAD_COUNT, 0xf9, 'Configuration sets max thread count');
  t.equal(config.BOARD_ID, 0x18f3e974, 'Configuration sets board ID');
  t.end();
});

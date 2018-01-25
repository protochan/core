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
var Post = require('../js/block/post.js');
var Header = require('../js/block/header.js');
var Block = require('../js/block/block.js');
var Genesis = require('../js/block/genesis.js');
var GenesisPost = require('../js/block/genesisPost.js');
var Hash = require('../js/hash/blake2s.js');
var Util = require('../js/util.js');

module.exports.validPost = function() {
  let d_buf = new ArrayBuffer(41);
  let view = new DataView(d_buf);
  view.setUint32(0, 0x0024ffff);
  view.setUint8(40, 0xff);

  let header = validPostHeaderFromData(d_buf);

  return new Post(header, d_buf);
};

module.exports.validGenesisPost = function() {
  let d_buf = new ArrayBuffer(41);
  let view = new DataView(d_buf);
  view.setUint32(0, 0x0024ffff);
  view.setUint8(40, 0xff);

  let header = validPostHeaderFromData(d_buf);
  for (let i = 11; i < 43; i++) {
    header.data[i] = 0;
  }

  return new GenesisPost(header, d_buf);
};

module.exports.validGenesis = function(post) {
  Util.assert(post instanceof GenesisPost)
  let d_buf = new ArrayBuffer(64);
  let arr = new Uint8Array(d_buf);
  for (let i = 0; i < 32; i++) {
    arr[i] = 0x00;
  }
  let postHash = Hash.digest(post.header.data);

  for (let i = 32; i < 64; i++) {
    arr[i] = postHash[i-32];
  }

  let header = validThreadHeaderFromData(d_buf);

  return new Genesis(header, d_buf);
}

module.exports.validBlock = function() {
  var buf = new ArrayBuffer(128);

  return new Block(validHeaderFromData(buf), buf);
};

module.exports.validHeaderFromData = validHeaderFromData = function(dataBuffer) {
  let h_buf = new ArrayBuffer(80);
  let h_arr = new Uint8Array(h_buf);
  let hash = Hash.digest(new Uint8Array(dataBuffer));
  for (let i = 43; i < 75; i++) {
    h_arr[i] = hash[i-43];
  }
  return new Header(h_buf);
}

module.exports.validPostHeaderFromData = validPostHeaderFromData = function(dataBuffer) {
  let h = validHeaderFromData(dataBuffer);
  h.data[2] = 0x01;
  return h;
}

module.exports.validThreadHeaderFromData = validThreadHeaderFromData = function(dataBuffer) {
  let h = validHeaderFromData(dataBuffer);
  h.data[2] = 0x00;
  return h;
}

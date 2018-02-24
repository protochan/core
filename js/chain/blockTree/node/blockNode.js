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

'use strict';

const ErrorType = require('../../../error.js');
const Util = require('../../../util/util.js');
const DataParser = require('../../../block/dataParser/dataParserTypeMap.js');
const HashMap = require('../../../hash/hashMap.js');

module.exports = class BlockNode {
  constructor(header, data, config) {
    this.header = header;
    this.data = DataParser.create(header.blockType(), data);
    this.config = config;

    if (!Util.arrayEquality(this.data.hash, header.dataHash())) {
      throw ErrorType.Data.hash();
    }

    this.hash = header.hash;
    this.children = new HashMap();
  }

  // convenience
  type() {
    return this.header.type();
  }

  timestamp() {
    return this.header.timestamp();
  }
};
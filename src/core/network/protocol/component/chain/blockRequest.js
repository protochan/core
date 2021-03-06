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

const Inv = require('../../../message/types/inv.js');
const GetBlock = require('../../../message/types/getblock.js');

module.exports = class BlockRequest {
  static id() { return 'BLOCK_REQUEST'; }
  static inputs() { return ['RECEIVER', 'CHAIN']; }

  static attach({ RECEIVER, CHAIN }) {
    return RECEIVER
      .filter(({ data }) => Inv.getCommand(data) === Inv.COMMAND())
      .map(({ connection, data }) => ({ connection, msg: new Inv(data) }))
      .on(({ connection, msg }) => {
        const vectors = [];
        msg.forEach((vector) => {
          if (!CHAIN.nodeMap.contains(vector.hash())) {
            vectors.push(vector);
          }
        });
        connection.outgoing.next({
          command: GetBlock.command(),
          payload: GetBlock.create(vectors),
        });
      });
  }
};

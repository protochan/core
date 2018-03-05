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

const Message = require('./message.js');

module.exports = class Pong extends Message {
  static PAYLOAD_LENGTH() { return 4; }
  static COMMAND() { return 0x00000003; }

  constructor(data) {
    super(data, Pong.PAYLOAD_LENGTH());
  }

  static create(magic, timestamp) {
    const payload = new Uint8Array(Pong.PAYLOAD_LENGTH());
    Message.setUint32(payload, timestamp, 0);

    const data = Message.createData(
      magic,
      Pong.COMMAND(),
      payload,
    );
    return new Pong(data);
  }

  timestamp() {
    return Message.getUint32(this.data, Message.HEADER_LENGTH());
  }
};

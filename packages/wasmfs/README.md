# @wasmer/wasmfs

Isomorphic library to provide a sandboxed [node `fs`](https://nodejs.org/api/fs.html) implementation for Node and Browsers. 📂

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Reference API](#reference-api)
- [Contributing](#contributing)

## Features

This project heavily depends on [memfs](https://github.com/streamich/memfs) to provide the sandboxed `fs` implementation. 🙏😄

This package provides the following features:

- In-memory file-system with Node's fs API using [memfs](https://github.com/streamich/memfs). 🗄️
- Scaffolds common shell I/O device files (e.g `/dev/stdout`), to provide a similar experience to the [Wasmer Runtime](https://github.com/wasmerio/wasmer). 🔌
- Provides convienence functions for grabbing Input / Output. ↔️
- Allows overriding read/write of individual files to allow for custom implementations. 🛠️

## Installation

For installing `@wasmer/wasmfs`, just run this command in your shell:

```bash
npm install --save @wasmer/wasmfs
```

## Quick Start

```js
import WasmFs from "@wasmer/wasmfs";

const wasmFs = new WasmFs();

wasmFs.fs.writeFileSync("/dev/stdout", "Quick Start!");

wasmFs.getStdOut().then(response => {
  console.log(response); // Would log: 'Quick Start!'
});
```

For a larger end-to-end example, please see the [wasm-terminal package]('../wasm-terminal').

## Reference API

`wasmFs.fs`

[memfs](https://github.com/streamich/memfs)' [node fs](https://nodejs.org/api/fs.html) implementation object. See the [node fs documentation](https://nodejs.org/api/fs.html) for API usage.

---

`wasmFs.getStdOut()`

Function that returns a promise that resolves a string. With the file contents of `/dev/stdout`.

## Contributing

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.

Contributions of any kind are welcome! 👍

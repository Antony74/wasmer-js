# wasm-transformer

Library to run transformations on WebAssembly binaries. 🦀♻️

**This README covers the instructions for installing, using, and contributing to the `wasm-transformer` Javascript package. [The `wasm_transformer` Rust crate is available here](../../packages/wasm-transformer).**

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Reference API](#reference-api)
- [Contributing](#contributing)
  - [Guidelines](#guidelines)
  - [Building the project](#building-the-project)

## Features

This project depends on [wasmparser](https://github.com/yurydelendik/wasmparser.rs), and the [wasm-pack](https://github.com/rustwasm/wasm-pack) workflow. Huge shoutout to them! 🙏

- Runs transformations on Wasm binaries to modify the actual code that gets run, and introduces new features (such as introducing trampoline functions for i64 WASI imports). ✨

- Installable on both crates.io, and npm! 📦

- The project builds with [wasm-pack](https://github.com/rustwasm/wasm-pack). Thus, you can use this library in a Javascript library, to modify WebAssembly Binaries, with WebAssembly. 🤯

- Super fast! Can run the `lower_i64_imports` transformations on my 2018 MackBook Pro, with the Chrome Devtools 6x CPU slowdown in ~ 1 second. ⚡

## Installation

```
npm install --save @wasmer/wasm-transformer
```

## Quick Start

For a larger example, see the [wasm-terminal](../../packages/wasm-terminal) package.

### Node Usage

```js
const wasmTransformer = require("@wasmer/wasm-transformer");

// Read in the input Wasm file
const wasmBuffer = fs.readFileSync("./my-wasm-file.wasm");

// Transform the binary
const wasmBinary = new Uint8Array(wasmBuffer);
const loweredBinary = wasmTransformer.lowerI64Imports(wasmBinary);

// Do something with loweredBinary
```

### Inlined (Development) Browser Usage

The default import of `@wasmer/wasm-transformer` points to the inlined development bundle. This bundle **has it's wasm file from the `wasm_transformer` crate as a Base64 encoded URL in the bundle.** This is done for convience and developer experience. **Production applications that are being used by every day users should be using the production bundles instead**.

```js
import wasmTransformerInit, { lowerI64Imports } from "@wasmer/wasm-transformer";

const fetchAndTransformWasmBinary = async () => {
  // Get the original Wasm binary
  const fetchedOriginalWasmBinary = await fetch("/original-wasm-module.wasm");
  const originalWasmBinaryBuffer = await fetchedOriginalWasmBinary.arrayBuffer();
  const originalWasmBinary = new Uint8Array(originalWasmBinaryBuffer);

  // Initialize our wasm-transformer
  await wasmTransformerInit();

  // Transform the binary, by running the lower_i64_imports from the wasm-transformer
  const transformedBinary = lowerI64Imports(originalWasmBinary);

  // Compile the transformed binary
  const transformedWasmModule = await WebAssembly.compile(transformedBinary);
  return transformedWasmModule;
};
```

### Production Browser Usage

Production bundles do not have the `wasm_transformer` rust crate `.wasm` inlined. Thus, it must be manually passed in.

```js
import wasmTransformerInit, {
  lowerI64Imports
} from "@wasmer/wasm-transformer/wasm-transformer.prod.esm.js";

const fetchAndTransformWasmBinary = async () => {
  // Get the original Wasm binary
  const fetchedOriginalWasmBinary = await fetch("/original-wasm-module.wasm");
  const originalWasmBinaryBuffer = await fetchedOriginalWasmBinary.arrayBuffer();
  const originalWasmBinary = new Uint8Array(originalWasmBinaryBuffer);

  // Initialize our wasm-transformer
  await wasmTransformerInit(
    "node_modules/@wasmer/wasm-transformer/wasm-transformer.wasm"
  ); // IMPORTANT: This URL points to wherever the wasm-transformer.wasm is hosted

  // Transform the binary, by running the lower_i64_imports from the wasm-transformer
  const transformedBinary = lowerI64Imports(originalWasmBinary);

  // Compile the transformed binary
  const transformedWasmModule = await WebAssembly.compile(transformedBinary);
  return transformedWasmModule;
};
```

## Reference API

**Default Export** - `wasmTransformerInit(passWasmUrlIfNotInlined: string): Promise`

Initialzation function exported by `wasm-pack build`. If we are using a non-inlined bundle (production) Takes in a URL to where the `wasm-transformer.wasm` is hosted.

---

`version()`

Returns the version of the package.

---

`lowerI64Imports(wasmBinaryWithI64Imports: Uint8Array): Uint8Array`

Inserts trampoline functions for imports that have i64 params or returns. This is useful for running Wasm modules in browsers that [do not support JavaScript BigInt -> Wasm i64 integration](https://github.com/WebAssembly/proposals/issues/7). Especially in the case for [i64 WASI Imports](https://github.com/CraneStation/wasmtime/blob/master/docs/WASI-api.md#clock_time_get).

## Contributing

### Guidelines

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.

Contributions of any kind are welcome! 👍

### Building the project

To get started using the project:

- Set up the [`wasm_transformer` rust crate](../../crates/wasm_transformer)

- Install the latest LTS version of Node.js (which includes `npm` and `npx`). An easy way to do so is with nvm. (Mac and Linux: [here](https://github.com/creationix/nvm), Windows: [here](https://github.com/coreybutler/nvm-windows)).

- `npm run build`.

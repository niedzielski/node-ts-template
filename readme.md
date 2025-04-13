# Node.js TypeScript Template

Using TypeScript in Node.js with minimal dependencies and no compilation.
Node.js previously only supported plain JavaScript. Since [v22.6.0],
experimental _[type-stripping]_ support was added to enable TypeScript natively
for imports, executables, and even the built-in test runner.

## Pros

- No production dependencies and minimal development dependencies.
- No compilation.
- The same language everywhere: server code, client code, tests, and tools. No
  errorprone shell scripts or verbose JSDoc JavaScript.
- Overall less complexity.

## Cons

- A build process may still be wanted for other reasons such as bundling or
  React.
- Only type annotations are supported. TypeScript features that generate code
  are unsupported: enums, namespaces, and constructor parameter props, will all
  fail to interpret. Pass the [--experimental-transform-types] flag to enable
  these features.
- Differing import extensions. Node.js requires .ts for TypeScript imports and
  .js or no extension for everything else.
- Most projects will require a massive TypeScript config (but type-stripping
  doesn't contribute much to that preexisting problem).

[v22.6.0]:
  https://github.com/nodejs/node/blob/v22.6.0/doc/changelogs/CHANGELOG_V22.md#experimental-typescript-support-via-strip-types
[type-stripping]: https://nodejs.org/en/learn/typescript/run-natively
[--experimental-transform-types]: https://nodejs.org/en/blog/release/v22.7.0#experimental-transform-types-support

## Encapsulate Interpreter with a Shebang

Executable scripts should encapsulate their invocations with a shebang:

```
#!/usr/bin/env -S node --experimental-strip-types --no-warnings=ExperimentalWarning
```

Starting with [v23.6.0], type-stripping is enabled by default so
`--experimental-strip-types` should be omitted. Mark the script executable:
`chmod +x foo.ts` and use a .ts extension.

[v23.6.0]:
  https://github.com/nodejs/node/blob/v23.6.0/doc/changelogs/CHANGELOG_V23.md#unflagging---experimental-strip-types

## Testing TypeScript with the Built-in Test Runner

No Vitest or Jest required. Invoke the standard Node.js test runner with
type-stripping:

```
$ node \
  --experimental-strip-types \
  --no-warnings=ExperimentalWarning \
  --test \
  **/*.test.ts
```

## The Big TypeScript Config for Multiple Projects

Multi-environment projects seem to require a massive TypeScript configuration
file like [tools/tsconfig-base.json](tools/tsconfig-base.json). This project is
no better and little worse: add `allowImportingTsExtensions` and
`erasableSyntaxOnly` to the base config and either
`rewriteRelativeImportExtensions` or `noEmit` to each subproject.

## Running NPM Scripts in Parallel

Use `wait` and rely on sighup to close forks.

```
$ npm run hello -- --goodbye&
$ sleep 10&
$ wait
```

This is useful for composing NPM scripts. See the `dev:with-args` script for an
argument passing example by wrapping in a shell script.

## NPM Scripts

- `run dev`: run the primary development workflow.
- `install`: install dependencies.
- `start`: run production server.
- `test`: execute all tests.
- `run test:unit`: run the unit tests.

💡 Add `--` to pass arguments to the script command. For example,
`npm run test:unit -- --test-update-snapshots` to update snapshots.

## Project Structure

- **src**/: source inputs.
  - **client**/: browser code.
  - **server**/: server code.
  - **shared**/: isomorphic code.
  - **test**/, **\*.test.ts**: tests and test utils.
- **tools**/: development scripts and configs.

## License (Public Domain)

All code in this repository is public domain and may be used without limitation.

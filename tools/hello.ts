#!/usr/bin/env -S node --experimental-strip-types --no-warnings=ExperimentalWarning
// Prints a greeting
//
// hello.ts --name=<name> [--goodbye]
// --goodbye Invert greeting.
// --name  Greeting recipient.

const name: string | undefined = process.argv
  .find(arg => arg.startsWith('--name'))
  ?.split('=')[1]
if (!name) throw Error('no name')

const goodbye: boolean = process.argv.includes('--goodbye')

console.log(`${goodbye ? 'Goodbye' : 'Hello'}, ${name}`)

import {strict as assert} from 'node:assert'
import {test} from 'node:test'

test('primitive', () => assert.equal(true, true))

test('object', () => assert.deepEqual<{abc: number}>({abc: 123}, {abc: 123}))

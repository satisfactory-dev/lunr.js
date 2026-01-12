import lunr from '../lunr.mjs'
import chai from 'chai'
import fs from 'node:fs'
import path from 'node:path'

var withFixture = function (name, fn) {
  var fixturePath = path.join('test', 'fixtures', name)
  fs.readFile(fixturePath, fn)
}

const {assert} = chai;

global.lunr = lunr
global.assert = assert
global.withFixture = withFixture

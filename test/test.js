/* eslint-disable fp/no-unused-expression, fp/no-nil, no-undef, fp/no-rest-parameters */

import assert from 'assert';
import {match, Defined, Guard} from '../src';


describe('pnmg.match', () => {
  describe('Object patterns', () => {
    const matchObjectPatterns = arg => match(arg)
      .when({so: {me: 'cool'}}, () => 'nested cool')
      .when({}, () => 'This is an empty object')
      .when({foo: Defined}, () => 'foo attr is defined')
      .when({x: 42}, ({y}) => `x = 42 and y = ${y}`)
      .when({x: String, y: []}, () => 'x is a String and y is an empty Array')
      .when(Object, () => 'At least this is Object')
      .default(notObj => `${notObj} not Object`);


    it('should match nested', () => {
      assert.equal(matchObjectPatterns({so: {me: 'cool', s: 12}}), 'nested cool');
    });

    it('should match empty object', () => {
      assert.equal(matchObjectPatterns({}), 'This is an empty object');
    });

    it('should match foo attr is defined', () => {
      assert.equal(matchObjectPatterns({foo: true, x: 42}), 'foo attr is defined');
    });

    it('should match x is 42', () => {
      assert.equal(matchObjectPatterns({x: 42, y: false}), 'x = 42 and y = false');
    });

    it('should match x is String and y is an empty Array', () => {
      assert.equal(matchObjectPatterns({x: '', y: []}),
        'x is a String and y is an empty Array');
    });

    it('should match this is Object', () => {
      assert.equal(matchObjectPatterns({WUF: 'WUF'}), 'At least this is Object');
    });

    it('should match this not Object', () => {
      assert.equal(matchObjectPatterns(false), 'false not Object');
    });
  });


  describe('Array patterns', () => {
    const matchArrayPatterns = arg => match(arg)
      .when([], () => 'This is an empty array')
      .when([true, false], () => 'First el is true, second is false')
      .when([{WUF: 'WUFF'}], () => 'First element is Object with WUF attr with WUFF value')
      .when(Guard(arr => arr.length > 4), () => 'Array length greater than 4')
      .when(Array, ([head, ...tail]) => `Head is ${head} and tails is ${tail}`)
      .default(notArray => `${notArray} not Array`);

    it('should match empty array', () => {
      assert.equal(matchArrayPatterns([]), 'This is an empty array');
    });

    it('should match First el is true, second is false', () => {
      assert.equal(matchArrayPatterns([true, false, 'other']),
        'First el is true, second is false');
    });

    it('should match First element is Object with WUF attr with WUFF value', () => {
      assert.equal(matchArrayPatterns([{woo: 12, WUF: 'WUFF', foo: 42}]),
        'First element is Object with WUF attr with WUFF value');
    });

    it('should match Array length greater than 4', () => {
      assert.equal(matchArrayPatterns([1, 2, 3, 4, 5]),
        'Array length greater than 4');
    });

    it('should match Array', () => {
      assert.equal(matchArrayPatterns([1, 2, 3]),
        'Head is 1 and tails is 2,3');
    });

    it('should match that this not Array', () => {
      assert.equal(matchArrayPatterns({}), '[object Object] not Array');
    });
  });


  describe('Base patterns', () => {
    const matchBasePatterns = arg => match(arg)
      .when(Guard(x => x === 'certain string'), str => `BEHOLD! THIS IS A ${str.toUpperCase()}`)
      .when([Defined, {}, Guard(x => x > 10)], () => 'Array with Defined, empty Object and el > 10 at start')
      .when(Object, () => 'Object here')
      .when(42, () => 'ooohh, here is 42')
      .default(() => `${arg} not matched`);

    it('should match certain string', () => {
      assert.equal(matchBasePatterns('certain string'), 'BEHOLD! THIS IS A CERTAIN STRING');
    });

    it('should match Array with Defined, empty Object and el > 10 at start', () => {
      assert.equal(matchBasePatterns([true, {}, 42]),
        'Array with Defined, empty Object and el > 10 at start');
    });

    it('should match any Object', () => {
      assert.equal(matchBasePatterns({WUFFF: 'WF'}), 'Object here');
    });

    it('should match 42', () => {
      assert.equal(matchBasePatterns(42), 'ooohh, here is 42');
    });

    it('shouldnt match', () => {
      assert.equal(matchBasePatterns(true), 'true not matched');
    });
  });
});

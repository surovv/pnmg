Powerful and lightweight deep pattern matching for Javascript

# pnmg
[![Code Climate](https://codeclimate.com/github/surovv/pnmg/badges/gpa.svg)](https://codeclimate.com/github/surovv/pnmg) [![bitHound Overall Score](https://www.bithound.io/github/surovv/pnmg/badges/score.svg)](https://www.bithound.io/github/surovv/pnmg)

Pattern matching consists of specifying patterns to which some data should conform and then checking  to see if it does. Way to select behaviors based on the structure of a value in a similar way to destructuring.

The `pnmg` provides deep matching functionality with usefull extra types. Leads to write functional, immutable and expressive code.

**switch** with ~~blackja...~~ declarative style and deep matching.

## Installation

###  NPM

```sh
npm install --save pnmg
```

## Patterns

### Object Patterns
Object patterns match objects with certain properties. Additional properties may be present on the matched object.
Examples:

```js
import {match} from 'pnmg';

const arg = {/* data */};

match(arg)
  .when({}, () => {/* Match empty object */})
  .when({users: Array}, ({users}) => users.map(user => user.id))
  .when({x: 42, y: String}, obj => {/* Match object where x is 42 and y is String */})
  .when(Object, () => {/* Match any object */})
  .default(notObj => {/* default handler if none of patterns confirmed */});
```

### Array Patterns
Examples:

```js
import {match, Guard} from 'pnmg';

match(arg)
  .when([], () => {/* match an empty array */})
  .when([true, false], () => 'First el is true, second is false')
  .when([{WUF: 'WUFF'}], () => 'First element is Object with WUF attr with WUFF value')
  .when(Guard(arr => arr.length > 4), () => 'Array length greater than 4')
  .when(Array, ([head, ...tail]) => `Head is ${head} and tails is ${tail}`)
  .default(notArray => `${notArray} not Array`);
```

### Literal Patterns
Literal patterns are string, number, boolean, null, and undefined literals and matches exactly that value. Examples:

```js
match(arg)
  .when('WUF', str => {/* match the String value "WUF" */})
  .when(42, () => {/* match the Number value 42 */})
  .when(true, () => {/* match true */})
  .when(Boolean, () => {/* match any Boolean */})
  .default(() => `${arg} not matched`);
```

### Nested Patterns
Patterns can nest.
Example:

```js
const isCool = data => match(data)
  .when({info: {cool: true}}, handleCoolData)
  .default(() => 'Not cool');
```

## Types

### Defined
You can use **Defined** if you need to match data that could have any value except undefined.

### Guard
Use **Guard** when value need to match certain condition.

Example:
```js
import {match, Defined, Guard} from 'pnmg';

match(data)
  .when({pos: Guard(x => x > 0)}, arr => {/* Object with 'pos' attr and value > 0 */})
  .when([Defined, 42, Defined], arr => {/* array with at least 3 elements and the second is 42 */})
  .default(() => {/* not match */});
}
```

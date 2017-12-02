/// Types

const someType = class Some{};
export const Some = new someType;
// isSome :: a -> Bool
const isSome = x => x !== undefined;

const condType = class Cond{};
// Cond :: (a -> Bool) -> a -> Bool
export const Cond = f => Object.assign(arg => f(arg), {constructor: condType});

/// end Types



// matchArray :: (Array, Array) -> Bool
const matchArray = (patterns, vals) => (patterns.length === 0 && vals.length === 0) || (
  (patterns.length <= vals.length && patterns.length !== 0)
  && patterns.every((pattern, index) => isMatched(pattern, vals[index]))
);


// getObjectsKeys :: [Object] -> [String]
const getObjectsKeys = objects => objects.map(Object.keys);

// matchObject :: (Object, Object) -> Bool
const matchObject = (pattern, val) => {
  const [patternKeys, valKeys] = getObjectsKeys([pattern, val]);

  return (patternKeys.length === 0 && valKeys.length === 0) || (
    (patternKeys.length <= valKeys.length && patternKeys.length !== 0)
    && patternKeys.every(k => valKeys.includes(k) && isMatched(pattern[k], val[k]))
  );
};


// isMatched :: (a, b) -> Bool
const isMatched = (pattern, val) => (pattern === val)
  || (pattern === val.constructor)
  || (pattern.constructor === someType && isSome(val))
  || (pattern.constructor === condType && pattern(val))
  || (pattern.constructor === Array && matchArray(pattern, val))
  || (pattern.constructor === Object && matchObject(pattern, val))
;



// match :: (a, [[b, a -> c]]) -> Object
export const match = (val, patterns = []) => ({
  when: (pattern, pval) => match(val, [...patterns, [pattern, pval]]),

  default: defFn => {
    const finded = patterns.find(([pattern, result]) => isMatched(pattern, val));
    return (finded ? finded[1] : defFn)(val)
  },
});



export default match;

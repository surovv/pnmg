import {DefinedType, isDefined, GuardType} from './types';


// matchArray :: (Array, Array) -> Bool
const matchArray = (vals, patterns) => (
  (patterns.length === 0 && vals.length === 0)
  || (
    (patterns.length <= vals.length && patterns.length !== 0)
    && patterns.every((pattern, index) => isMatched(vals[index], pattern))
  )
);


// getObjectsKeys :: [Object] -> [String]
const getObjectsKeys = objects => objects.map(Object.keys);

// matchObject :: (Object, Object) -> Bool
const matchObject = (val, pattern) => {
  const [patternKeys, valKeys] = getObjectsKeys([pattern, val]);

  return (patternKeys.length === 0 && valKeys.length === 0)
    || (
      patternKeys.length <= valKeys.length
      && patternKeys.length !== 0
      && patternKeys.every(k => valKeys.includes(k) && isMatched(val[k], pattern[k]))
    );
};


// isMatched :: (a, b) -> Bool
const isMatched = (val, pattern) => (
  (val === pattern)
  || (val.constructor === pattern)
  || (pattern.constructor === DefinedType && isDefined(val))
  || (pattern.constructor === GuardType && pattern(val))
  || (val.constructor === Array && pattern.constructor === Array && matchArray(val, pattern))
  || (val.constructor === Object && pattern.constructor === Object && matchObject(val, pattern))
);


// match :: (a, [[b, a -> c]]) -> Object
export const match = (val, patterns = []) => ({
  when: (pattern, handler) => match(val, [...patterns, [pattern, handler]]),

  default: handler => {
    const finded = patterns.find(([pattern, _handler]) => isMatched(val, pattern));
    return (finded ? finded[1] : handler)(val);
  },
});

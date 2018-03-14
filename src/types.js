export const DefinedType = class Defined {};

export const Defined = new DefinedType();

// isDefined :: a -> Bool
export const isDefined = x => x !== undefined;


export const CondType = class Cond {};
// Cond :: (a -> Bool) -> a -> Bool
export const Cond = f => Object.assign(arg => f(arg), {constructor: CondType});

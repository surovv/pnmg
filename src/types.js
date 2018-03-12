export const SomeType = class Some {};

export const Some = new SomeType();

// isSome :: a -> Bool
export const isSome = x => x !== undefined;


export const CondType = class Cond {};
// Cond :: (a -> Bool) -> a -> Bool
export const Cond = f => Object.assign(arg => f(arg), {constructor: CondType});

export const DefinedType = class Defined {};

export const Defined = new DefinedType();

// isDefined :: a -> Bool
export const isDefined = x => x !== undefined;


export const GuardType = class Guard {};
// Guard :: (a -> Bool) -> a -> Bool
export const Guard = f => Object.assign(arg => f(arg), {constructor: GuardType});

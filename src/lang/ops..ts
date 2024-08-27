/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

// export type KeyT = string | number | symbol

export class Get<Coll, Key, RVal> {
  readonly _tag = 'Get'
  constructor(lhs: Coll, rhs: Key, op: (_: Coll) => RVal) {}
}

export type Getter<Coll, RVal> = <R>(cont: <Key>(_: Get<Coll, Key, RVal>) => R) => R

export class Assoc<Coll, Key, Val, RColl> {
  readonly _tag = 'Assoc'
  constructor(lhs: Coll, rhs: [Key, Val], op: (_: Coll) => RColl) {}
}

export type Assocer<Coll, RColl> = <R>(cont: <Key, Val>(_: Assoc<Coll, Key, Val, RColl>) => R) => R

export class Dissoc<Coll, Key, RColl> {
  readonly _tag = 'Dissoc'
  constructor(lhs: Coll, rhs: Key, op: (_: Coll) => RColl) {}
}

export type Dissocer<Coll, RColl> = <R>(cont: <Key>(_: Dissoc<Coll, Key, RColl>) => R) => R

export class Rename<Coll, FromKey, ToKey, RColl> {
  readonly _tag = 'Rename'
  constructor(lhs: Coll, rhs: [FromKey, ToKey], op: (_: Coll) => RColl) {}
}

export type Renamer<Coll, RColl> = <R>(
  cont: <FromKey, ToKey>(_: Rename<Coll, FromKey, ToKey, RColl>) => R
) => R

export class Project<Coll, Keys, RColl> {
  readonly _tag = 'Project'
  constructor(lhs: Coll, rhs: Keys[], op: (_: Coll) => RColl) {}
}

export type Projecter<Coll, RColl> = <R>(cont: <Keys>(_: Project<Coll, Keys, RColl>) => R) => R

// export class Select<Coll, Predicate, RColl> {
//   readonly _tag = 'Select'
//   constructor(lhs: Coll, rhs: Predicate, op: (_: Coll) => RColl) {}
// }

// export type Selecter<Coll, RColl> = <R>(
//   cont: <Predicate>(_: Select<Coll, Predicate, RColl>) => R
// ) => R

// export class Sort<Coll, Key, Direction, RColl> {
//   readonly _tag = 'Filter'
//   constructor(lhs: Coll, rhs: [Key, Direction], op: (_: Coll) => RColl) {}
// }

// export class Take<Coll, Items, RColl> {
//   readonly _tag = 'Take'
//   constructor(lhs: Coll, rhs: Items, op: (_: Coll) => RColl) {}
// }

// export class Drop<Coll, Items, RColl> {
//   readonly _tag = 'Drop'
//   constructor(lhs: Coll, rhs: Items, op: (_: Coll) => RColl) {}
// }

// export class Union<Coll1, Coll2, RColl> {
//   readonly _tag = 'Union'
//   constructor(lhs: Coll1, rhs: Coll2, op: (_: Coll1) => RColl) {}
// }

// export class Group<Coll, Key, AccumFun, RColl> {
//   readonly _tag = 'Union'
//   constructor(lhs: Coll, rhs: [Key, AccumFun], op: (_: Coll) => RColl) {}
// }

// export class Match<Coll, Pattern, RColl> {
//   readonly _tag = 'Match'
//   constructor(lhs: Coll, rhs: Pattern, op: (_: Coll) => RColl) {}
// }

// export class Unify<Coll, Pattern, RColl> {
//   readonly _tag = 'Unify'
//   constructor(lhs: Coll, rhs: Pattern, op: (_: Coll) => RColl) {}
// }

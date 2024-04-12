export type Transmuted<SourceT, X> = X extends XMute<SourceT, infer TargetT> ? TargetT : never

export type XMute<SourceT, TargetT> =
  | Copy<SourceT, TargetT>
  | Lookup<SourceT, TargetT>
  | MappingOperation<SourceT, TargetT>
  | OperationList<SourceT, TargetT>
  | Mapping<SourceT, TargetT>

export type Copy<SourceT, TargetT> = SourceT extends TargetT ? '*' : never

export type Lookup<SourceT, TargetT> = SourceT extends Pick<SourceT, TargetT, infer P> ? P : never

export type Pick<SourceT, TargetT, PropertyT extends keyof SourceT> = {
  [Property in keyof PropertyT]: TargetT
}

export type Mapping<SourceT, TargetT> = {
  [Property in keyof TargetT]: XMute<SourceT, TargetT[Property]>
}

export type OperationList_2_Step<SourceT, ViaT, TargetT> = [
  XMute<SourceT, ViaT>,
  XMute<ViaT, TargetT>
]

export type OperationList_1_Step<SourceT, TargetT> = [XMute<SourceT, TargetT>]

export type OperationList<SourceT, TargetT> = XMute<SourceT, TargetT>[]

export type DottedPath<T extends string[]> = T extends [infer F, ...infer R]
  ? F extends string
    ? R extends string[]
      ? `${F}${R['length'] extends 0 ? '' : '.'}${DottedPath<R>}`
      : never
    : never
  : ''

export type MappingOperation<SourceT, TargetT> =
  | Path<SourceT>
  | FilterOperation<SourceT>
  | ProjectOperation<SourceT>
  | RenameOperation<SourceT>
  | TemplateOperation<SourceT>
  | UnionOperation<SourceT, TargetT>
  | DifferenceOperation<SourceT, TargetT>
  | IntersectOperation<SourceT, TargetT>
  | GroupOperation<SourceT>

export type Path<SourceT> = DottedPath<Array<keyof SourceT & string>> | string

export type Pattern<SourceT> = {
  [Property in keyof SourceT]: SourceT[Property]
}

export type FilterOperation<SourceT> = {
  $filter: Pattern<SourceT>
}

export type ProjectOperation<SourceT> = {
  $project: (keyof SourceT)[]
}

export type RenameOperation<SourceT> = {
  $rename: { [key in keyof SourceT]: string }
}

export type TemplateOperation<SourceT> = {
  $template: string | ((ctx: SourceT) => string)
}

export type UnionOperation<SourceT, TargetT> = {
  $union: XMute<SourceT, TargetT>[]
}

export type DifferenceOperation<SourceT, TargetT> = {
  $difference: XMute<SourceT, TargetT>[]
}

export type IntersectOperation<SourceT, TargetT> = {
  $intersect: Mapping<SourceT, TargetT>[]
}

export type GroupOperation<SourceT> = {
  $group: keyof SourceT
  $aggregate?: AggregateFunction<SourceT>
}

export type AggregateFunction<SourceT> = {
  $count?: boolean
  $sum?: keyof SourceT
  // Add more aggregate functions as needed
}

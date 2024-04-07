export type Mapping<SourceT, TargetT> =
  | {
      [Property in keyof TargetT]:
        | keyof SourceT
        | MappingOperation<SourceT, TargetT[Property]>
        | OperationList<SourceT, TargetT[Property]>
    }
  | OperationList<SourceT, TargetT>
  | MappingOperation<SourceT, TargetT>

export type OperationList<SourceT, TargetT> = (
  | (keyof SourceT & string)
  | MappingOperation<SourceT, TargetT>
)[]

export type DottedPath<T extends string[]> = T extends [infer F, ...infer R]
  ? F extends string
    ? R extends string[]
      ? `${F}${R['length'] extends 0 ? '' : '.'}${DottedPath<R>}`
      : never
    : never
  : ''

export type MappingOperation<SourceT, ResultT> =
  | DirectCopy<SourceT>
  | FilterOperation<SourceT>
  | ProjectOperation<SourceT>
  | RenameOperation<SourceT>
  | TemplateOperation<SourceT>
  | UnionOperation<SourceT>
  | DifferenceOperation<SourceT>
  | IntersectOperation<SourceT>
  | GroupOperation<SourceT>

export type DirectCopy<SourceT> = DottedPath<Array<keyof SourceT & string>> | '*' | string

export type Pattern<SourceT> = {
  [Property in keyof SourceT]: SourceT[Property]
}

export type FilterOperation<SourceT> = {
  $filter: Record<string, string>
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

export type UnionOperation<SourceT> = {
  $union: Mapping<SourceT, any>[]
}

export type DifferenceOperation<SourceT> = {
  $difference: Mapping<SourceT, any>[]
}

export type IntersectOperation<SourceT> = {
  $intersect: Mapping<SourceT, any>[]
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

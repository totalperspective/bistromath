type Mapping<SourceT, TargetT> = {
  [Property in keyof TargetT]:
    | keyof SourceT
    | MappingOperation<SourceT, TargetT[Property]>
    | OperationList<SourceT, TargetT[Property]>
}

type OperationList<SourceT, TargetT> = (
  | (keyof SourceT & string)
  | MappingOperation<SourceT, TargetT>
)[]

type DottedPath<T extends string[]> = T extends [infer F, ...infer R]
  ? F extends string
    ? R extends string[]
      ? `${F}${R['length'] extends 0 ? '' : '.'}${DottedPath<R>}`
      : never
    : never
  : ''

type MappingOperation<SourceT, ResultT> =
  | DirectCopy<SourceT>
  | FilterOperation<SourceT>
  | ProjectOperation<SourceT>
  | RenameOperation<SourceT>
  | TemplateOperation<SourceT>
  | UnionOperation<SourceT>
  | DifferenceOperation<SourceT>
  | IntersectOperation<SourceT>
  | GroupOperation<SourceT>

type DirectCopy<SourceT> = DottedPath<Array<keyof SourceT & string>> | '*'

type FilterOperation<SourceT> = {
  $filter: (item: SourceT) => boolean
}

type ProjectOperation<SourceT> = {
  $project: (keyof SourceT)[]
}

type RenameOperation<SourceT> = {
  $rename: { [key in keyof SourceT]: string }
}

type TemplateOperation<SourceT> = {
  $template: string | ((ctx: SourceT) => string)
}

type UnionOperation<SourceT> = {
  $union: Mapping<SourceT, any>[]
}

type DifferenceOperation<SourceT> = {
  $difference: Mapping<SourceT, any>[]
}

type IntersectOperation<SourceT> = {
  $intersect: Mapping<SourceT, any>[]
}

type GroupOperation<SourceT> = {
  $group: keyof SourceT
  $aggregate?: AggregateFunction<SourceT>
}

type AggregateFunction<SourceT> = {
  $count?: boolean
  $sum?: keyof SourceT
  // Add more aggregate functions as needed
}

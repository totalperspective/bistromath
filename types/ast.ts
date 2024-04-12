import { AggregateFunction, DottedPath, Lookup, Mapping, Pattern } from './dsl'

export enum NodeType {
  Lookup = 'Lookup',
  Filter = 'Filter',
  Project = 'Project',
  Rename = 'Rename',
  Template = 'Template',
  Union = 'Union',
  Difference = 'Difference',
  Intersect = 'Intersect',
  Group = 'Group',
  OperationList = 'OperationList',
}

export type NodeName = keyof typeof NodeType

// Extend the ASTNode type to include OperationListNode
export type ASTNode<SourceT, TargetT> =
  | LookupNode<SourceT, TargetT>
  | FilterNode<SourceT>
  | ProjectNode<SourceT>
  | RenameNode<SourceT>
  | TemplateNode
  | UnionNode<SourceT, TargetT>
  | DifferenceNode<SourceT, TargetT>
  | IntersectNode<SourceT, TargetT>
  | GroupNode<SourceT>
  | OperationListNode<SourceT, TargetT>

export interface OperationListNode<SourceT, TargetT> {
  type: NodeType.OperationList
  operations: ASTNode<SourceT, TargetT>[]
}
export interface LookupNode<SourceT, TargetT> {
  type: NodeType.Lookup
  path: Lookup<SourceT>
}

export interface FilterNode<SourceT> {
  type: NodeType.Filter
  condition: {
    [P in keyof SourceT]?: SourceT[P]
  }
}

export interface ProjectNode<SourceT> {
  type: NodeType.Project
  fields: Array<keyof SourceT & string>
}

export interface RenameNode<SourceT> {
  type: NodeType.Rename
  mappings: { [P in keyof SourceT]?: string }
}

export interface TemplateNode {
  type: NodeType.Template
  template: string
}

export interface UnionNode<SourceT, TargetT> {
  type: NodeType.Union
  operands: ASTNode<SourceT, TargetT>[]
}

export interface DifferenceNode<SourceT, TargetT> {
  type: NodeType.Difference
  operands: ASTNode<SourceT, TargetT>[]
}

export interface IntersectNode<SourceT, TargetT> {
  type: NodeType.Intersect
  operands: ASTNode<SourceT, TargetT>[]
}

export interface GroupNode<SourceT> {
  type: NodeType.Group
  key: keyof SourceT
  aggregate?: AggregateFunction<SourceT>
}

export type NodeMap<S, T> = {
  [Node in NodeType]: Extract<ASTNode<S, T>, { type: Node }>
}

export type NodeSpecMap<S, T> = {
  [Node in NodeType]: Omit<NodeMap<S, T>[Node], 'type'>
}

export type NodeConstructor = {
  [Node in NodeType]: <S, T>(spec: NodeSpecMap<S, T>[Node]) => NodeMap<S, T>[Node]
}

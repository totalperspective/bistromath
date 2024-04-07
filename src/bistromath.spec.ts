import type { Mapping } from '../types/dsl'
import { transmute } from './bistromath'

type Example = {
  name: string
  mapping: Mapping<object, object>
  expected: object
}

const source = {
  traveller: {
    name: 'Arthur Dent',
    contacts: [
      { type: 'email', value: 'arthur@heartofgold.com' },
      { type: 'phone', value: '123-4567' },
    ],
    actions: [
      { date: '2022-12-31', activity: 'boarding' },
      { date: '2023-01-01', activity: 'panicking' },
      { date: '2023-01-02', activity: 'finding towel' },
    ],
    preferences: {
      language: 'Galactic Standard',
      theme: "Don't Panic",
    },
  },
}

describe('transmute', () => {
  it('should map empty to empty', () => {
    expect(transmute({}, {})).toStrictEqual({})
  })
  describe('direct mapping', () => {
    const { traveller } = source
    type SourceT = typeof traveller
    type TargetT = {
      name?: string
    }
    const examples: Example[] = [
      // { name: 'Copy on *', mapping: { name: '*' }, expected: { name: 'Arthur Dent' } },
    ]
    // it.each(examples)('mapping:$message', ({ mapping, expected }) => {
    //   // @ts-expect-error Can't always infer the corrent tyoe for mapping
    //   expect(transmute<SourceT, TargetT>(mapping, traveller)).toBe(expected)
    // })
  })
})

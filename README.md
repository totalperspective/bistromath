# Bistromath

[![Deploy](https://github.com/totalperspective/bistromath/workflows/build/badge.svg)](https://github.com/totalperspective/bistromath/actions)
[![Coverage Status](https://coveralls.io/repos/github/totalperspective/bistromath/badge.svg?branch=master)](https://coveralls.io/github/totalperspective/bistromath?branch=master)

Bistromath is a "transformative" JavaScript/TypeScript library designed to simplify the mapping and transformation (told you) of data objects. Inspired by the ingenious Clojure library Meander and the expressive power of the EDN Query Language (EQL), Bistromath aims to reduce the intricacies involved in data object transformation and integration, employing a syntax that extends ES6 destructuring through EQL-like queries.

## Why Bistromath?

Named after the Bistromathic Drive from Douglas Adams' "The Hitchhiker's Guide to the Galaxy" series, Bistromath leverages the obscure yet fascinating principle that the rules of mathematics vary in restaurant environments. In a whimsical nod to Adams, our library acknowledges the unpredictable and often convoluted paths data can take in application ecosystems, offering a tool designed to navigate and simplify these complexities with almost magical ease.

## Getting Started

To install Bistromath, use npm:

```
npm install @totalperspective/bistromath
```

### Quick Start Example

```js
import { transmute } from '@totalperspective/bistromath'

const source = {
  "traveller": {
    "name": "Arthur Dent",
    "contacts": [
      {"type": "email", "value": "arthur@heartofgold.com"},
      {"type": "phone", "value": "123-4567"}
    ],
    "actions": [
      {"date": "2022-12-31", "activity": "boarding"},
      {"date": "2023-01-01", "activity": "panicking"},
      {"date": "2023-01-02", "activity": "finding towel"}
    ],
    "preferences": {
      "language": "Galactic Standard",
      "theme": "Don't Panic"
    }
  }
}

const mapping = ["traveller", {
  "name": "*",
  "email": ["contacts", {"$filter": {"type": "email"}}, "value"],
  "latestAction": ["actions", {"$sort": "date", "$order": "desc"}, "date", {"$limit": 1}],
  "preferredTheme": "preferences.theme"
}]

const result = transmute(source, mapping);
console.log(result); // Output: Transformed object
```
Result:
```
{
  "name": "Arthur Dent",
  "email": "arthur@heartofgold.com",
  "latestAction": "2023-01-02",
  "preferredTheme": "Don't Panic"
}
```
## Features

- Intuitive Syntax: Mappings that feel familiar yet are powerful and flexible.
- Advanced Queries: Leverage relational queries for complex data transformations.
- Efficiency: Reduce boilerplate and integrate various data sources seamlessly.
- Typescript ready: something cool about TS

## Todo
```
addMapping('Contacts', 'Contact<Type>', mapping1)
addMapping('Traveller', 'Profile', mapping2)
const transmuter = fromType('Tranveller', 'Profile')
```

Bootstrapped with: [create-ts-lib-gh](https://github.com/glebbash/create-ts-lib-gh)

This project is [MIT Licensed](LICENSE).

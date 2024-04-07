# Bistromath

Bistromath is a transformative JavaScript/TypeScript library designed to simplify the mapping and transformation of data objects. Inspired by the ingenious Clojure library Meander and the expressive power of the EDN Query Language (EQL), Bistromath aims to reduce the intricacies involved in data object transformation and integration, employing a syntax that extends ES6 destructuring through EQL-like queries.

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
  "user": {
    "name": "Jane Doe",
    "contacts": [
      {"type": "email", "value": "jane@example.com"},
      {"type": "phone", "value": "555-1234"}
    ],
    "usage": [
      {"date": "2023-01-01", "activity": "login"},
      {"date": "2023-01-02", "activity": "post"}
    ],
    "preferences": {
      "language": "English",
      "theme": "Light"
    }
  }
}

const mapping = ["user", {
  "name": "*",
  "email": ["contacts", {"$filter": {"type": "email"}}, "value"],
  "lastActivity": ["usage", {"$sort": "date", "$order": "desc"}, "date", {"$limit": 1}],
  "preferredTheme": "preferences.theme"
}]

const result = transmute(source, mapping);
console.log(result); // Output: Transformed object
```
```
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "lastActivity": "2023-01-02",
  "preferredTheme": "Light"
}
```
## Features

- Intuitive Syntax: Mappings that feel familiar yet are powerful and flexible.
- Advanced Queries: Leverage relational queries for complex data transformations.
- Efficiency: Reduce boilerplate and integrate various data sources seamlessly.
- Typescript ready: something cool about TS

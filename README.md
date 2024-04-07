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

## DSL

The DSL (Domain-Specific Language) for data mapping allows complex transformations with operations like direct copy, filtering, sorting, and templating. It's designed for flexibility, supporting relational algebra concepts such as union, difference, intersection, and aggregation. Operations can be sequenced for nested transformations, ensuring a concise and powerful tool for shaping data into desired formats. Ideal for adapting diverse data sources to uniform models, this DSL streamlines data preparation for applications, analytics, and integration tasks.

### Operations

The table of operations provides a concise overview of the DSL's capabilities for data mapping and transformation. Each operation, modeled after relational algebra concepts, is designed for specific data manipulation tasks, such as filtering, projecting, renaming, and aggregating data. The syntax column illustrates how to apply each operation, while the description explains its purpose. Options offer customization for each operation, and examples demonstrate practical usage. This guide facilitates understanding how to effectively utilize the DSL to reshape and prepare data for various applications.

| Name          | Syntax       | Description                              | Options          | Example                                          |
|---------------|--------------|------------------------------------------|------------------|--------------------------------------------------|
| Direct Copy   | `"*"` or direct path | Copies data from source to target without transformation. | None             | `"email": "user.email"`                          |
| $filter       | `{"$filter": {...}}` | Filters elements based on conditions.    | Conditions for filtering | `["user.contacts", {"$filter": {"type": "email"}}, "value"]` |
| $sort         | `{"$sort": "field"}` | Sorts data based on specified field.     | `"asc"` or `"desc"` for order | `["user.usage", {"$sort": "date", "$order": "desc"}]` |
| $limit        | `{"$limit": n}` | Limits the number of items to return.    | Number of items to limit | `{"$limit": 1}`                                  |
| $template     | `{"$template": "templateString"}` | Creates a string from template with placeholders. | Template string with placeholders | `{"$template": "{user.name} - {user.role}"}` |
| $union        | `{"$union": [...]} `| Combines sets without duplicates.        | Arrays of sets to union | `{"$union": [set1, set2]}`                      |
| $difference   | `{"$difference": [...]} `| Finds elements in first set not in second. | Arrays of sets to differentiate | `{"$difference": [set1, set2]}`               |
| $intersect    | `{"$intersect": [...]} `| Finds common elements between sets.      | Arrays of sets to intersect | `{"$intersect": [set1, set2]}`                 |
| $group        | `{"$group": "field", "$aggregate": {...}}` | Groups items by field with optional aggregation. | Field to group by and aggregation functions | `{"$group": "type", "$count": true}`            |
| $rename     | `{"$rename": {"old": "new"}}` | Renames a field in the output.                                              | Field mappings  | `{"$rename": {"userId": "id"}}`                            |
| $project    | `{"$project": [...fields]}`  | Selects and includes only the specified fields in the output.               | Fields to include | `{"$project": ["name", "email"]}`                         |
| Operation List | `[...]`                   | A sequential list of operations to apply, supporting nested transformations. | Operations in sequence | `["user.contacts", {"$filter": {"type": "email"}}, "value"]` |

The operation list (`[...]`) allows specifying a sequence of operations to be applied in order, supporting complex transformations like filtering and extracting nested data, embodying the essence of functional composition in data mapping.

---

Bootstrapped with: [create-ts-lib-gh](https://github.com/glebbash/create-ts-lib-gh)

This project is [MIT Licensed](LICENSE).

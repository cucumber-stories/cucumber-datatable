# Cucumber DataTable

## Installation

`npm i @cucumber-stories/cucumber-datatable`

## What is it?

Cucumber DataTable is a library to simplify and enhance data tables in gherkins feature files.
By providing schema for your data table you can easily pass from silly strings to structured and typed data.

### A sample is better than 100 words:

Imagine you want to handle a gherkin table like this:

```gherkin
Feature: Heroes sample

  Scenario: A simple heroes table
    Given the following heroes
      | Name         | Age |
      | Bruce Wayne  | 83  |
      | Tony Stark   | 52  |
      | Bruce Banner | 53  |
```

#### Thanks to `@cucumber-stories/cucumber-datatable` write this...

```typescript
import { DataTable } from "@cucumber/cucumber";
import { cucumberDataTable } from "@cucumber-stories/cucumber-datatable";

const getHeroes = cucumberDataTable({
  name: { columnName: "Name", converter: Converters.String },
  age: { columnName: "Age", converter: Converters.Number },
});

Given(/^The following heroes$/, function (dataTable: DataTable) {
  const heroes = getHeroes(dataTable);
  console.log(heroes); // [{ name: 'Bruce Wayne', age: 83 }, ...]
});
```

#### ...Instead of that

```typescript
import { DataTable } from "@cucumber/cucumber";

Given(/^The following heroes$/, function (table: DataTable) {
  const lines = data.raw();
  // Here you have an hugly array of string arrays (string[][]) ☹️
});
```

## How to use it?

First, you have to define a dictionary composed of 2 things.
It has the same keys as output objects and attach to it the following metadata:

- `columnName`: The column name in the gherkin file (`.feature`)
- `converter`: The converter to use to transform the data from the gherkin data table

You have to use the `cucumberDataTable()` function to create a reusable function used in your steps to transform your
data.

```typescript
import { cucumberDataTable } from "@cucumber-stories/cucumber-datatable";

const dictionary = {
  name: {
    columnName: "Name", // Column name in Gherkin file
    converter: Converters.String, // Converter to use (more samples bellow)
  },
  age: {
    columnName: "Age",
    converter: Converters.Number,
  },
};

const getStructuredData = cucumberDataTable(dictionary);

// ....
Given(/^The following table/, function (dataTable: DataTable) {
  const data = getStructuredData(dataTable);
});
```

### Converters

Converters are used to convert the data.
Out of the box the library provides some useful converters.

| Name                        | In Gherkin         | Output                               | Config                        |
| --------------------------- | ------------------ | ------------------------------------ | ----------------------------- |
| `Converters.String`         | `"Foo"`            | `"Foo"`                              |                               |
| `Converters.Number`         | `"42"`             | `42`                                 |                               |
| `Converters.YesNoToBoolean` | `"yes"` or `"no"`  | `true` or `false`                    | `{ yes: string; no: string }` |
| `Converters.StringArray`    | `"Foo, Bar"`       | `["Foo", "Bar"]`                     | `{ separator: string }`       |
| `Converters.ObjectArray`    | `"Foo:42, Bar:32"` | [see below](#object-array-converter) |                               |

#### Object array converter

The `Converters.ObjectArray()` is a bit tricky, so it deserve its own part in our documentation.

Imagine the following gherkin file:

```gherkin
Feature: Heroes sample

  Scenario:
    Given the following attributes
      | Attributes     | Other |
      | 1:Color,2:Size | other |
      | 10:Name        | other |
```

If you want an output like this:

```typescript
[
  {
    attributes: [
      { code: 1, name: "Color" },
      { code: 2, name: "Size" },
    ],
    other: "other",
  },
  {
    attributes: [{ code: 10, name: "Name" }],
    other: "other",
  },
];
```

You probably need the `Converters.ObjectArray()`.

To use this converter you have to define:

- the separator of different items
- the separator of different properties of a same object

And then the schema of nested objects:

```typescript
import {
  cucumberDataTable,
  Converters,
} from "@cucumber-stories/cucumber-datatable";

const itemsWithCommaConverter = Converters.ObjectArray({
  propertySeparator: ":",
  itemSeparator: ",",
});

const dictionary = {
  attributes: {
    columnName: "Attributes",
    converter: itemsWithCommaConverter({
      code: {
        position: 0,
        converter: Converters.Number,
      },
      name: {
        position: 1,
        converter: Converters.String,
      },
    }),
  },
  // Other columns...
  other: {
    columnName: "Other",
    converter: Converters.String,
  },
};

const getStructuredData = cucumberDataTable(dictionary);
```

#### Custom converter

At the end a converter is a simple function which takes a string in argument (the data from the gherkin file) and
returns what you want.

For example if you want to output a custom structure from a column you can do this:

```typescript
import {
  cucumberDataTable,
  Converters,
} from "@cucumber-stories/cucumber-datatable";

const dictionary = {
  code: {
    columnName: "Code",
    converter: (code: string) => ({ nested: code }),
  },
  // Other columns...
  other: {
    columnName: "Other",
    converter: Converters.String,
  },
};

const getStructuredData = cucumberDataTable(dictionary);
```

It will transform this table:

```gherkin
Feature: Heroes sample

  Scenario: A simple heroes table
    Given the following table
      | Code | Other |
      | 001  | other |
      | 002  | other |
```

Into:

```typescript
[
  { code: { nested: "001" }, other: "other" },
  { code: { nested: "002" }, other: "other" },
];
```

## Development

### Running tests

Run `npm test` and `npm run test-types`

### Publish a new version

1. `npm version <major|minor|patch>`
2. `git push --tags`
3. Create a release on this tag.

# Cucumber DataTable

[![Node.js CI](https://github.com/cucumber-stories/cucumber-datatable/actions/workflows/ci.yml/badge.svg)](https://github.com/cucumber-stories/cucumber-datatable/actions/workflows/ci.yml)

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
    converter: Converters.String, // Converter to use (more samples below)
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

Some of the converters can be configurable, you can have details on the [Converter config](#converter-config) section.

| Name                        | In Gherkin                    | Output                               | [Default config](#converter-config)              |
| --------------------------- | ----------------------------- | ------------------------------------ | ------------------------------------------------ |
| `Converters.String`         | `"Foo"`                       | `"Foo"`                              |                                                  |
| `Converters.Number`         | `"42"`                        | `42`                                 |                                                  |
| `Converters.YesNoToBoolean` | `"yes"` or `"no"`             | `true` or `false`                    | `{ yes: "yes"; no: "no" }`                       |
| `Converters.StringArray`    | `"Foo, Bar"`                  | `["Foo", "Bar"]`                     | `{ separator: "," }`                             |
| `Converters.ObjectArray`    | `"Foo:42, Bar:32"`            | [see below](#object-array-converter) | `{ propertySeparator: ":", itemSeparator: "," }` |
| `Converters.Nullable`       | `"<null>"`                    | [see below](#nullable)               | `{ nullValue: "<null>" }`                        |
| `Converters.Custom`         | Your special formatting logic | [see below](#custom-converter)       |                                                  |

#### Converter config

If a converter needs configuration, you can call `.withConfig` method with the specified configuration, such as:

```typescript
const dictionary = {
  tags: {
    columnName: "Tags",
    converter: Converters.StringArray.withConfig({
      separator: "-",
    }),
  },
};
```

#### Nullable

If some of your values need to be nullable, and want to be used as `null` in your code, you can use the `Nullable`
converter.

```typescript
const dictionary = {
  name: {
    columnName: "Name",
    converter: Converters.Nullable(Converters.String),
  },
};

// name will be string | null
```

You can also configure the null value, which default to `<null>`

```typescript
const dictionary = {
  name: {
    columnName: "Name",
    converter: Converters.Nullable(Converters.String, {
      nullValue: "vide",
    }),
  },
};

// name will be string | null, when the value is "vide"
```

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

const dictionary = {
  attributes: {
    columnName: "Attributes",
    converter: Converters.ObjectArray({
      code: {
        position: 0,
        converter: Converters.Number,
      },
      name: {
        position: 1,
        converter: Converters.String,
      },
    }).withConfig({
      propertySeparator: ":",
      itemSeparator: ",",
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

> You don't have to specify `.withConfig` if you want to keep the default config which
> is `{ propertySeparator: ":", itemSeparator: "," }`

#### Custom converter

To sum up, a converter is an instance of the `Converter` class. To create a custom converter to answer your need, you have
to use `Converter.Custom(<Your converter function>)`.

The converter function takes:

1. a string in argument (the data from the gherkin file),
2. an optional config as a second parameter,
3. and returns what you want.

For example if you want to output a custom structure from a column you can do this:

```typescript
import {
  cucumberDataTable,
  Converters,
} from "@cucumber-stories/cucumber-datatable";

const dictionary = {
  code: {
    columnName: "Code",
    converter: Converters.Custom((code: string) => ({ nested: code })),
  },
  configurableCode: {
    columnName: "Configurable code",
    converter: Converters.Custom(
      (code: string, config?: { append: string }) => code + config?.append
    ).withConfig({
      append: "-code",
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

It will transform this table:

```gherkin
Feature: Heroes sample

  Scenario: A simple heroes table
    Given the following table
      | Code | Configurable code | Other |
      | 001  | 001               | other |
      | 002  | 001               | other |
```

Into:

```typescript
[
  { code: { nested: "001" }, configurableCode: "001-code", other: "other" },
  { code: { nested: "002" }, configurableCode: "002-code", other: "other" },
];
```

## Development

### Running tests

Run `npm test` and `npm run test-types`

### Publish a new version

1. `npm version <major|minor|patch>`
2. `git push --tags`
3. Create a release on this tag.

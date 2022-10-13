// Nathan +1
import { DataTable } from "@cucumber/cucumber";

const yolo1 = createGetterFromDictionary1([
  {
    gherkinKey: "User name",
    outputKey: "name",
    converter: stringConverter,
  },
  {
    gherkinKey: "User email",
    outputKey: "email",
    converter: stringConverter,
  },
]);

const yolo2 = createGetterFromDictionary2({
  name: {
    outputKey: "name",
    converter: stringConverter,
  },
  "User email": {
    outputKey: "email",
    converter: stringConverter,
  },
});

// Nico +1
const yolo3 = createGetterFromDictionary3({
  name: {
    gherkinKKey: "User name",
    converter: stringConverter,
  },
  email: {
    outputKey: "User email",
    converter: stringConverter,
  },
});

// type Record<K extends keyof any, T> = {
//   [P in K]: T;
// };

// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

type Converter<T> = (param: string) => T;

type Dictionary<K extends keyof any, T> = {
  [P in K]: { converter: Converter<unknown> };
};
type ConverterOutput<T> = T extends { converter: Converter<infer R> }
  ? R
  : never;
type DictionaryOutput<D> = D extends {
  [P in keyof D]: { converter: Converter<any> };
}
  ? { [P in keyof D]: ConverterOutput<D[P]> }
  : never;

type GherkinDataTableGetter<T> = (d: DataTable) => T[];

function cucumberTable<D extends Dictionary<K, M>, K extends keyof any, M>(
  dictionary: D
): GherkinDataTableGetter<DictionaryOutput<D>> {
  return {} as any;
}

const Converters = {
  String: (data: string) => data,
  YesNoToBoolean: (data: string) => true,
} as const;

const getUsers = cucumberTable({
  firstName: "FirstName",
  name: {
    columnName: "User name",
    converter: Converters.String,
  },
  isActive: {
    columnName: "Activated",
    converter: Converters.YesNoToBoolean,
  },
  adresses: {
    columnName: "Adresses",
    converter: Converters.ValuesSeparatedBy("/").withSchema({
      name: {
        index: 0,
        converter: Converters.String,
      },
      isMainAddress: {
        index: 1,
        converter: Converters.YesNoToBoolean,
      },
    }),
  },
});

// @see envVar as enum

Given(/^The following users$/, function (dataTable: DataTable) {
  const users = getUsers(dataTable);
});

Given(
  /^The following users$/,
  function (
    @CucumberTable(UserDictionnary) users: CDataTable<typeof UserDictionnary>
  ) {}
);

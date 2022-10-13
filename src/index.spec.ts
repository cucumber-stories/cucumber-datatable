import { DataTable } from "@cucumber/cucumber";

const stringConverter: Converter<string> = (value) => value;
const numberConverter: Converter<number> = (value) => +value;

const dico = [
  {
    gherkinKey: "User name",
    outputKey: "userName",
    converter: stringConverter,
  },
  {
    gherkinKey: "User age",
    outputKey: "userAge",
    converter: numberConverter,
  },
];

const myGetterFunction = createGetterFromDictionary(dico);

type Converter<T> = (gherkinValue: string) => T;
type DictionaryEntry<T, K extends string> = {
  gherkinKey: string;
  outputKey: K;
  converter: Converter<T>;
};

type KeyOfDictionaryEntry<D> = D extends DictionaryEntry<
  infer ENTRY_TYPE,
  infer OUTPUT
>
  ? {
      [K in OUTPUT]: ENTRY_TYPE;
    }
  : never;

type ExtractedItem<K> = K extends [infer DICO]
  ? KeyOfDictionaryEntry<DICO>
  : K extends [infer DICO, ...infer REST]
  ? KeyOfDictionaryEntry<DICO> & ExtractedItem<REST>
  : never;

type bonjour = ExtractedItem<
  [DictionaryEntry<string, "bonjour">, DictionaryEntry<number, "hello">]
>;

// TODO DAU: trouver le type des cucumbers
type Dictionary = any;

type Getter<ITEM> = (dataTable: DataTable) => ITEM;

function createGetterFromDictionary(
  dictionary: Dictionary
): Getter<ExtractedItem<Dictionary>> {
  return {} as any;
}

const aTable = new DataTable([["User name"], ["Doe"]]);

const yolo = createGetterFromDictionary([
  {
    gherkinKey: "User name",
    outputKey: "name",
    converter: stringConverter,
  },
]);

const table = yolo(aTable);


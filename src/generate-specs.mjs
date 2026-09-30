import { readFileSync, writeFileSync } from "node:fs";

function readJson(relativePath) {
  return JSON.parse(readFileSync(new URL(relativePath, import.meta.url), "utf8"));
}

const originalSchemas = {
  "2.0": readJson("../original-schemas/v2.0.json"),
  "3.0": readJson("../original-schemas/v3.0.json"),
};

const commonExtensions = readJson("../sap-extensions/extensions.json");
const extensionSchemas = {
  "2.0": readJson("../sap-extensions/v2.0-extensions.json"),
  "3.0": readJson("../sap-extensions/v3.0-extensions.json"),
};

function getAtPath(value, objectPath) {
  return objectPath.split(".").reduce((current, key) => current?.[key], value);
}

function applyExtension(sourceSchema, extensions) {
  const destinationSchema = structuredClone(sourceSchema);

  for (const { paths, properties } of extensions["x-extends"]) {
    for (const objectPath of paths) {
      const destinationObject = getAtPath(destinationSchema, objectPath);
      if (destinationObject) {
        Object.assign(destinationObject, properties);
      }
    }
  }

  Object.assign(destinationSchema.definitions, extensions.definitions);
  return destinationSchema;
}

function generateSchema(version) {
  const withCommonExtensions = applyExtension(originalSchemas[version], commonExtensions);
  const schema = applyExtension(withCommonExtensions, extensionSchemas[version]);
  const destination = new URL(`../sap-schemas/v${version}/schema.json`, import.meta.url);

  writeFileSync(destination, `${JSON.stringify(schema, null, 2)}\n`);
}

generateSchema("2.0");
generateSchema("3.0");

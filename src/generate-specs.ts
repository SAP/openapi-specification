import _ from "lodash";
import * as fs from "fs";
import * as path from "path";
// import { OpenAPIV3, OpenAPIV2 } from "openapi-types";

import oas_2_0_original from "../original-schemas/v2.0.json";
import oas_3_0_original from "../original-schemas/v3.0.json";
import oas_extensions from "../sap-extensions/extensions.json";
import oas_2_0_extensions from "../sap-extensions/v2.0-extensions.json";
import oas_3_0_extensions from "../sap-extensions/v3.0-extensions.json";

type SupportedVersions = "2.0" | "3.0";
// type OpenAPIDocument = OpenAPIV3.Document | OpenAPIV2.Document;
type Extension = {
  paths: string[];
  properties: any;
};

const oasOriginalSchemas = {
  "2.0": oas_2_0_original,
  "3.0": oas_3_0_original,
};

const oasExtensionSchemas = {
  "2.0": oas_2_0_extensions,
  "3.0": oas_3_0_extensions,
};

const applyExtension = (sourceSchema: any, extensions: any) => {
  const destinationSchema = _.cloneDeep(sourceSchema);

  (extensions["x-extends"] as Extension[]).forEach(({ paths, properties }) => {
    paths.forEach((path) => {
      let destinationObject = _.get(destinationSchema, path);
      if (destinationObject) {
        destinationObject = Object.assign(destinationObject, properties);
        _.set(destinationSchema, path, destinationObject);
      }
    });
  });

  destinationSchema.definitions = Object.assign(
    destinationSchema.definitions,
    extensions.definitions
  );

  return destinationSchema;
};

const generateSchema = (version: SupportedVersions) => {
  let schema = applyExtension(oasOriginalSchemas[version], oas_extensions); // apply common fields
  schema = applyExtension(schema, oasExtensionSchemas[version]); // apply version specific fields

  fs.writeFileSync(
    path.resolve(`./sap-schemas/v${version}/schema.json`),
    JSON.stringify(schema, null, 2)
  );
};

generateSchema("2.0");
generateSchema("3.0");

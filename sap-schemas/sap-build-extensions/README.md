# SAP Build Extensions

This specification purpose is to describe all JSON Schema extensions that are defined at SAP Build level. The main idea is that the definitions starting by `x-sap` without the `-build` suffix could be reused by other SAP Areas.

## Notational Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

## JSON Schema

Fully compiled and ready to use JSON Schema file is available [here](./schema.json).

## Defined Specification Extensions

### `x-sap-value-help`

- Type: `Object`
- Description: A Value Help

Constraints:

- OPTIONAL
- Schema:
  |Field Name|Type|Description|
  |---|---|---|
  |dataSource|`Object`|**REQUIRED**. A [x-sap-value-help-data-source](#x-sap-value-help-data-source) representing the data source from which the value help will be populated |
  |keyProperty|`String`|**REQUIRED**. The property identifier that will be used as the key for the value help|
  |displayOnlyProperties|`Array`|**OPTIONAL**. The additional property identifiers that will be displayed in the value help for the end user |

### `x-sap-value-help-data-source`

- Type: `Object`
- Description: A Value Help Data Source from which the value help will be populated

Constraints:

- OPTIONAL
- Schema:
  One of [x-sap-value-help-data-source-static](#x-sap-value-help-data-source-static), [x-sap-build-value-help-data-source-action](#x-sap-build-value-help-data-source-action), [x-sap-build-value-help-data-source-api](#x-sap-build-value-help-data-source-api)

### `x-sap-value-help-data-source-static`

- Type: `Object`
- Description: A Static Value Help Data Source from which the value help will be populated

Constraints:

- OPTIONAL
- Schema:
  |Field Name|Type|Description|
  |---|---|---|
  |type|`String`|**REQUIRED**. The type of the data source. Static value "static" |
  |valueSchema|`Object`|**REQUIRED**. The JSON Schema that describes the format of the values that will populate the value help |
  |values|`Array`|**REQUIRED**. The static list of values that will populate the value help, the values should follow the JSON Schema provided in valueSchema property |

### `x-sap-build-value-help-data-source-action`

- Type: `Object`
- Description: The SAP Build Value Help Action data source from which the value help will be populated

Constraints:

- OPTIONAL
- Schema:
  |Field Name|Type|Description|
  |---|---|---|
  |type|`String`|**REQUIRED**. The type of the data source. Static value "sap.build:action" |
  |actiongroup|`string`|**REQUIRED**. The reference to the action group artifact |
  |action|`string`|**REQUIRED**. The reference to the action in the action group |

### `x-sap-build-value-help-data-source-api`

- Type: `Object`
- Description: The SAP Build Value Help API data source from which the value help will be populated

Constraints:

- OPTIONAL
- Schema:
  |Field Name|Type|Description|
  |---|---|---|
  |type|`String`|**REQUIRED**. The type of the data source. Static value "sap.build:api" |
  |apiPath|`string`|**REQUIRED**. The path of the API to call |
  |valuesPath|`string`|**OPTIONAL**. The JSON Path of the value help values in the response of the API call |
  |destination|`string`|**OPTIONAL**. The destination name on which the API will be called |
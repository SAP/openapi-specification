# SAP OpenAPI Specification v2.0

This specification is based on [OpenAPI Specification v2.0](https://spec.openapis.org/oas/v2.0).

Every SAP OpenAPI Specification v2.0 document is also a valid OpenAPI v2.0 (Swagger v2.0) document.

## Notational Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

## JSON Schema

Fully compiled and ready to use JSON Schema file is available [here](./schema.json).

## Defined Specification Extensions

### `x-sap-compliance-level`

- Type: `String`
- Allowed Values:
  - `sap:base:v1`
  - `sap:core:v1`
  - `sap:core:v2`
- Used at: [Swagger Object](https://spec.openapis.org/oas/v2.0#swagger-object) (root level)
- Description: The compliance level that this API resource is expected to be compliant with. This corresponds to the [ORD policy level](https://pages.github.tools.sap/CentralEngineering/open-resource-discovery-specification/#/v1/generated/Document?id=package_policylevel) concept.

Constraints:

- OPTIONAL

### `x-sap-shortText`

- Type: `String`
- Used at: [Swagger Object](https://spec.openapis.org/oas/v2.0#swagger-object) (root level)
- Description: To display a short description of your APIs

Constraints:

- OPTIONAL

### `x-sap-software-min-version`

- Type: `String`
- Used at: [Swagger Object](https://spec.openapis.org/oas/v2.0#swagger-object) (root level)
- Description: To provide the minimum software version

Constraints:

- OPTIONAL

### `x-sap-api-type`

- Type: `String`
- Used at: [Swagger Object](https://spec.openapis.org/oas/v2.0#swagger-object) (root level)
- Description: Type of API

Constraints:

- OPTIONAL
- Allowed values are:
  - REST
  - SOAP
  - ODATA
  - ODATAV4

### `x-sap-ext-overview`

- Type: `Array`
- Used at: [Swagger Object](https://spec.openapis.org/oas/v2.0#swagger-object) (root level)
- Description: To provide stakeholder-specific information

Constraints:

- OPTIONAL

- Array Item:

  - Type: `Object`
  - Schema:

    | Field Name | Type                 | Description                                         |
    | ---------- | -------------------- | --------------------------------------------------- |
    | name       | `String`             | **REQUIRED**. Information title                     |
    | values     | `String` or `Object` | **REQUIRED**. Object type MAY contain any structure |

  - Values may be an object of the following structure:

    | Field Name | Type     | Description                                                           |
    | ---------- | -------- | --------------------------------------------------------------------- |
    | text       | `String` | **REQUIRED**. The actual value for a given extension.                 |
    | format     | `String` | **REQUIRED**. The value format. Possible values: `plain`, `markdown`. |

Example:

```json
[
  {
    "name": "Communication Scenario",
    "values": [
      {
        "text": "Planning Calendar API Integration: SAP_COM_0550",
        "format": "plain"
      }
    ]
  },
  {
    "name": "Authentication Methods",
    "values": [
      {
        "text": "Basic, x509",
        "format": "plain"
      }
    ]
  }
]
```

### `x-sap-stateInfo`

- Type: `Object`
- Used at: [Swagger Object](https://spec.openapis.org/oas/v2.0#swagger-object) (root level)
- Description: API Status

Constraints:

- OPTIONAL
- Schema:
  |Field Name|Type|Description|
  |---|---|---|
  |state|`String`|**REQUIRED**. API lifecycle state. Possible values: `Beta`, `Active`, `Deprecated`, `Decommissioned`. Defaults to `Active` |
  |deprecationDate|`String`|**RECOMMENDED** if API is deprecated. Deprecation date of the API (when the deprecation process started).<br><br>The `deprecationDate` must follow the [RFC 3339 full-date](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) format `yyyy-mm-dd`. For example: `2022-01-01`, `2021-11-14`<br><br>Consumers should use this date to know they should stop using this deprecated API. The provided date may be used to anticipate the decommission deadline, based on the rules for minimum lifespan (see [Deprecation Policy](https://sap.sharepoint.com/:w:/r/teams/CPAIntegration/_layouts/15/Doc.aspx?sourcedoc=%7B39FAC929-C93A-47D7-B299-3442A522F05F%7D&file=API%20Deprecation%20Policy.docx&action=default&mobileredirect=true)).|
  |decommissionedDate|`String`|**RECOMMENDED** if API is Deprecated. MUST be provided once known. Decommission date (aka sunset date) of the API, when it will not be available anymore.<br><br>The `decommissionedDate` must follow the [RFC 3339 full-date](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) format `yyyy-mm-dd`. For example: `2022-01-01`, `2021-11-14` |
  |successorApi|`Uri`|Provides an URL to a successor API|

### `x-servers`

- Type: `Array`
- Used at: [Swagger Object](https://spec.openapis.org/oas/v2.0#swagger-object) (root level)
- Description: To specify multiple hosts

Constraints:

- OPTIONAL
- Array Item:

  - Type: `Object`
  - Schema:

    | Field Name  | Type     | Description                                                                                                                                                           |
    | ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | url         | `String` | API base URL. They URL may contain [templates](https://spec.openapis.org/oas/v2.0#path-templating). Each template variable MUST be defined in the `templates` object. |
    | description | `String` | Description of the API host.                                                                                                                                          |
    | templates   | `Object` | Defines a set of variables (placeholders) to be used in `url` field.                                                                                                  |

    **Templates schema**:

    Type: `Object`

    | Field Name  | Type       | Description                                           |
    | ----------- | ---------- | ----------------------------------------------------- |
    | default     | `String`   | **REQUIRED**. Default value of the template variable. |
    | enum        | `String[]` | List of possible values.                              |
    | description | `String`   | Description of the template variable.                 |

Example:

```json
[
  {
    "url": "https://clm-sl-ans-live-ans-service-api.cfapps.{region}.hana.ondemand.com",
    "description": "Alert Notification endpoints",
    "templates": {
      "region": {
        "enum": ["eu10", "us10", "jp10"],
        "default": "eu10",
        "description": "Landscape region"
      }
    }
  }
]
```

### `x-sap-extensible`

- Type: `Object`
- Used at: [Swagger Object](https://spec.openapis.org/oas/v2.0#swagger-object) (root level)
- Description: Extensibility Information

Constraints:

- OPTIONAL
- MUST follow the ORD `extensible` object contract
  - See [ORD Extensible Object Interface](https://pages.github.tools.sap/CentralEngineering/open-resource-discovery-specification/#/v1/generated/Document?id=extensible)

Example:

```json
{
  "x-sap-extensible": {
    "supported": "manual",
    "description": "API can be extended by custom fields on the following business contexts (field usage for this API needs to be selected):\r\n* Procurement: Purchasing Document (MM_PURDOC_HEADER)\r\n* Procurement: Purchasing Document Item (MM_PURDOC_ITEM)\r\n\r\n[How to add an extension field to an API](https://help.sap.com/viewer/9a281eac983f4f688d0deedc96b3c61c/latest/en-US/57909455bf7c4fdd8bcf48d76c1eae33.html)"
  }
}
```

### `x-sap-direction`

- Type: `String`
- Used at: [Swagger Object](https://spec.openapis.org/oas/v2.0#swagger-object) (root level)
- Description: Indicates the direction of an API

Constraints:

- OPTIONAL
- Allowed values are:
  - inbound (default)
  - outbound
  - mixed

Example:

```json
{
  "x-sap-direction": "outbound"
}
```

### `x-sap-ord-id`

- Type: `String`
- Format: Valid [ORD ID for API Resources](https://sap.github.io/open-resource-discovery/spec-v1/interfaces/document#api-resource_ordid)
- Used at: [Swagger Object](https://spec.openapis.org/oas/v2.0#swagger-object) (root level)
- Description: The ORD ID can be used to lookup more high-level metadata via Business Accelerator Hub or Unified Customer Landscape. It is also used when describing Integration Dependencies.

Constraints:

- OPTIONAL
- MUST be a valid [ORD ID](https://sap.github.io/open-resource-discovery/spec-v1/#ord-id) for [API Resources](https://sap.github.io/open-resource-discovery/spec-v1/interfaces/document#api-resource_ordid)
  - Regexp: `^([a-z0-9]+(?:[.][a-z0-9]+)*):(apiResource):([a-zA-Z0-9._\-]+):(v0|v[1-9][0-9]*)$`

Example:

```json
{
  "x-sap-ord-id": "sap.s4:apiResource:OP_API_CATALOGPROFILE:v1"
}
```

## Operation level extensions

### `x-sap-operation-intent`

- Type: `String`
- Used at: [Operation Object](https://spec.openapis.org/oas/v2.0#operation-object)
- Description: The intent of the operation, a fixed list of values that can be extended on request

| Intent            | Description                                                                                                           | HTTP verbs     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- | -------------- |
| `create-single`   | insert a single object into a collection                                                                              | `POST`         |
| `create-multiple` | insert multiple objects into a collection                                                                             | `POST`         |
| `read-single`     | read a single object                                                                                                  | `GET`          |
| `read-collection` | read a collection, can typically be combined with query options `$search`, `$filter`, `$orderby`, `$top`, and `$skip` | `GET`          |
| `update-single`   | full or partial update of a single object, may allow "deep" update of a root object and its nested objects            | `PATCH`, `PUT` |
| `upsert-single`   | full or partial update or insert of a single object, may allow "deep" update of a root object and its nested objects  | `PATCH`, `PUT` |
| `upsert-multiple` | full or partial update of multiple objects, may allow "deep" update of root and nested objects                        | `PATCH`, `PUT` |
| `action`          | unspecific action                                                                                                     | `POST`         |

Constraints:

- OPTIONAL

Example:

```json
{
  "paths": {
    "/products": {
      "get": {
        "x-sap-operation-intent": "read-collection",
        ...
      },
      "post": {
        "x-sap-operation-intent": "create-single",
        ...
      },
      "patch": {
        "x-sap-operation-intent": "upsert-multiple",
        ...
      }
    },
    "/products/{id}": {
      "get": {
        "x-sap-operation-intent": "read-single",
        ...
      },
      "patch": {
        "x-sap-operation-intent": "update-single",
        ...
      },
      "put": {
        "x-sap-operation-intent": "update-single",
        ...
      },
      "delete": {
        ...
      }
    }
  }
}
```

### `x-sap-deprecated-operation`

- Type: `Object`
- Used at: [Operation Object](https://spec.openapis.org/oas/v2.0#operation-object)
- Description: Deprecation information of an API operation

Constraints:

- OPTIONAL
- If present, Operation Object MUST also contain fixed field [`deprecated`](https://spec.openapis.org/oas/v2.0.html#fixed-fields-4) with a value of `true`
- Schema:
  |Field Name|Type|Description|
  |---|---|---|
  |deprecationDate|`String`|**REQUIRED** if API operation is deprecated. Deprecation date of the API operation (when the deprecation process started).<br><br>The `deprecationDate` must follow the [RFC 3339 full-date](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) format `yyyy-mm-dd`. For example: `2022-01-01`, `2021-11-14`<br><br>Consumers should use this date to know they should stop using this deprecated API operation.|
  |successorOperationRef|`Uri`|A relative or absolute URI reference to an successor API operation. This field is mutually exclusive of the `successorOperationId` field, and MUST point to an [Operation Object](https://spec.openapis.org/oas/v2.0#operation-object). Relative `successorOperationRef` values MAY be used to locate an existing [Operation Object](https://spec.openapis.org/oas/v2.0#operation-object) in the OpenAPI definition.|
  |successorOperationId|`String`|The name of an existing, resolvable successor API operation, as defined with a unique `operationId`. This field is mutually exclusive of the `successorOperationRef` field.|

Example:

```json
{
  "paths": {
    "/products": {
      "get": {
        "deprecated": true,
        "x-sap-deprecated-operation": {
          "deprecationDate": "2024-06-01",
          "successorOperationId": "successorOperation"
        },
        ...
      },
    }
  }
}
```

## Schema level extensions

### `x-sap-odm-entity-name`

- Type: `String`
- Used at: [Schema Object](https://spec.openapis.org/oas/v2.0#schema-object)
- Description: Name of an ODM entity as a general concept, not a concrete version thereof. <br/> The annotated schema is one of many representations of the ODM entity. Annotating the schema with this term helps consumers find APIs that process or expose the same entity.

Constraints:

- OPTIONAL

Example:

```json
{
  "definitions": {
    "Cat": {
      "x-sap-odm-entity-name": "Cat",
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "name": {
          "type": "string"
        }
      }
    }
  }
}
```

### `x-sap-odm-semantic-key`

- Type: `Array`
- Used at: [Schema Object](https://spec.openapis.org/oas/v2.0#schema-object)
- Description: Semantic key is a human-readable identifier used exclusively for the purpose of identifying business objects by the end-user.

Constraints:

- OPTIONAL

- Array Item:

  - Type: `Object`
  - Schema:

    | Field Name | Type     | Description                                             |
    | ---------- | -------- | ------------------------------------------------------- |
    | name       | `String` | Semantic key name.                                      |
    | values     | `String` | List of properties which are parts of the semantic key. |

Example:

```json
[
  {
    "name": "CostCenter",
    "values": ["costCenterId", "validityEndDate", "controllingArea"]
  }
]
```

### `x-sap-odm-oid`

- Type: `String`
- Used at: [Schema Object](https://spec.openapis.org/oas/v2.0#schema-object)
- Description: The named field is an OID (ODM identifier), and it uniquely identifies an ODM root entity in a customer landscape. <br/> The technical type can be UUID or String (typical length 128), and the value must be stable and unique at least within type and landscape (better globally). An entity may have other IDs, i.e. a local ID and other alternative IDs.

Constraints:

- OPTIONAL

Example:

The `x-sap-odm-oid` custom field points to the `oid` property which contains the actual OID.

```json
{
  "definitions": {
    "Cat": {
      "x-sap-odm-oid": "oid",
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "oid": {
          "type": "string"
        }
      }
    }
  }
}
```

### `x-sap-odm-oid-reference-entity-name`

- Type: `String`
- Used at: [Schema Object](https://spec.openapis.org/oas/v2.0#schema-object)
- Description: An annotation to specify the ODM entity name of the referenced entity if required. The annotation is to be used on property level and the value must be the entity name.

Constraints:

- OPTIONAL

Example:

The `x-sap-odm-oid-reference-entity` custom field points to the ODM entity `ReferencedEntity`.

```json
{
  "definitions": {
    "Cat": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "referencedEntity": {
          "x-sap-odm-oid-reference-entity-name": "ReferencedEntity",
          "type": "string",
          "maxLength": 128
        }
      }
    }
  }
}
```

### `x-sap-precision`

- Type: `Integer`
- Used at: [Schema Object](https://spec.openapis.org/oas/v2.0#schema-object)
- Description: The maximum number of significant decimal digits of the numeric value.

Constraints:

- OPTIONAL
- MUST be a positive integer
- MUST be used with [`"format": "decimal"`](https://spec.openapis.org/registry/format/decimal.html)
- MAY be used with `"type": "string"`, `"type": "number"`, or any combination with these

### `x-sap-scale`

- Type: `Integer`
- Used at: [Schema Object](https://spec.openapis.org/oas/v2.0#schema-object)
- Description: The maximum number of decimal digits to the right of the decimal point.

Constraints:

- OPTIONAL
- MUST be a non-negative integer
- MUST be used with [`"format": "decimal"`](https://spec.openapis.org/registry/format/decimal.html)
- MAY be used with `"type": "string"`, `"type": "number"`, or any combination with these

Example: `DECIMAL(23,2)` value for `price`

```json
{
  "definitions": {
    "Product": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "price": {
          "type": ["number", "string"],
          "format": "decimal",
          "x-sap-precision": 23,
          "x-sap-scale": 2
        }
      }
    }
  }
}
```

### `x-sap-root-entity`

- Type: `Boolean`
- Used at: [Schema Object](https://spec.openapis.org/oas/v2.0#schema-object)
- Description: Indicates if the marked object represents a root entity. A root entity is the root of a business object. It has a distinct existence. Examples are real-world objects, like a workforce person or a piece of equipment or other more abstract real-world concepts, like a contract or an order. It has an independent lifetime / identity and is globally and uniquely addressable (via the unique identifier provided by the property referenced in [x-sap-odm-oid](#x-sap-odm-oid) field).

Constraints:

- OPTIONAL
- Default: `false`

```json
{
  "definitions": {
    "Product": {
      "type": "object",
      "x-sap-root-entity": true,
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        }
      }
    }
  }
}
```

### `x-sap-dpp-entity-semantics`

- Type: `String`
- Allowed Values:
  - `sap:DataSubject`
  - `sap:DataSubjectDetails`
  - `sap:Other`
- Used at: [OpenAPI Schema Object](https://spec.openapis.org/oas/v2.0#schema-object)
- Description: Primary meaning of the personal data in the annotated entity set. Entities annotated with `x-sap-dpp-entity-semantics` are synonymous to `x-sap-dpp-is-potentially-personal`.

Constraints:

- OPTIONAL

### `x-sap-dpp-data-subject-role`

- Type: `String`
- Used at: [OpenAPI Schema Object](https://spec.openapis.org/oas/v2.0#schema-object)
- Description: Role of the data subjects in this set (e.g. employee, customer). Values are application-specific.

Constraints:

- OPTIONAL

### `x-sap-dpp-data-subject-role-description`

- Type: `String`
- Used at: [OpenAPI Schema Object](https://spec.openapis.org/oas/v2.0#schema-object)
- Description: Language-dependent description of the role of the data subjects in this set (e.g. employee, customer). Values are application-specific.

Constraints:

- OPTIONAL

### `x-sap-dpp-field-semantics`

- Type: `String`
- Used at: [OpenAPI Schema Object](https://spec.openapis.org/oas/v2.0#schema-object
- Description: Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with `x-sap-dpp-field-semantics` need not be additionally annotated with `x-sap-dpp-is-potentially-personal`.
- Allowed Values:
  - `sap:DataSubjectID`
  - `sap:ConsentID`
  - `sap:PurposeID`
  - `sap:ContractRelatedID`
  - `sap:LegalEntityID` (to be deprecated)
  - `sap:DataControllerID`
  - `sap:UserID`
  - `sap:EndOfBusinessDate`
  - `sap:BlockingDate`
  - `sap:EndOfRetentionDate`

Constraints:

- OPTIONAL

### `x-sap-dpp-is-potentially-personal`

- Type: `Boolean`
- Used at: [Schema Object](https://spec.openapis.org/oas/v2.0#schema-object)
- Description: Property contains potentially personal data. Properties annotated with `x-sap-dpp-field-semantics` need not be additionally annotated with this extension.

Constraints:

- OPTIONAL
- Default: `true`

### `x-sap-dpp-is-potentially-sensitive`

- Type: `Boolean`
- Used at: [Schema Object](https://spec.openapis.org/oas/v2.0#schema-object)
- Description: Property contains potentially sensitive personal data.

Constraints:

- OPTIONAL
- Default: `true`

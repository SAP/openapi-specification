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

    |Field Name|Type|Description|
    |---|---|---|
    |name|`String`|**REQUIRED**. Information title|
    |values|`String` or `Object`|**REQUIRED**. Object type MAY contain any structure|

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
    |state|`String`|**REQUIRED**. API state. Possible values: `Beta`, `Active`, `Deprecated`, `Decommissioned`. Defaults to `Active` |
    |deprecationDate|`String`|Deprecation date of the API (when the deprecation process started).<br><br>The `deprecationDate` must follow the [RFC 3339 full-date](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) format `yyyy-mm-dd`. For example: `2022-01-01`, `2021-11-14`<br><br>Consumers should use this date to know they should stop using this deprecated API. The provided date may be used to anticipate the decommission deadline, based on the rules for minimum lifespan (see [Deprecation Policy](https://sap.sharepoint.com/:w:/r/teams/CPAIntegration/_layouts/15/Doc.aspx?sourcedoc=%7B39FAC929-C93A-47D7-B299-3442A522F05F%7D&file=API%20Deprecation%20Policy.docx&action=default&mobileredirect=true)).|
    |decommissionedDate|`String`|Decommission date of the API (sunset date, when it will not be available anymore).<br><br>The `decommissionedDate` must follow the [RFC 3339 full-date](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) format `yyyy-mm-dd`. For example: `2022-01-01`, `2021-11-14` |
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

    |Field Name|Type|Description|
    |---|---|---|
    |url|`String`|API base URL. They URL may contain [templates](https://spec.openapis.org/oas/v2.0#path-templating). Each template variable MUST be defined in the `templates` object.|
    |description|`String`|Description of the API host.|
    |templates|`Object`|Defines a set of variables (placeholders) to be used in `url` field.|

    **Templates schema**:

     Type: `Object`

    |Field Name|Type|Description|
    |---|---|---|
    |default|`String`|**REQUIRED**. Default value of the template variable.|
    |enum|`String[]`|List of possible values.|
    |description|`String`|Description of the template variable.|


Example:
```json
[
  {
    "url": "https://clm-sl-ans-live-ans-service-api.cfapps.{region}.hana.ondemand.com",
    "description": "Alert Notification endpoints",
    "templates": {
      "region": {
        "enum": [
          "eu10",
          "us10",
          "jp10"
        ],
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
  },
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

## Schema level extensions

### `x-sap-odm-entity-name`

- Type: `String`
- Used at: [Schema Object](https://spec.openapis.org/oas/v2.0#schema)
- Description: Name of an ODM entity as a general concept, not a concrete version thereof. <br/> The annotated schema is one of many representations of the ODM entity. Annotating the schema with this term helps consumers find APIs that process or expose the same entity.

Constraints:

- OPTIONAL

Example:

```json
{
    "components": {
        "schemas": {
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
}
```


### `x-sap-odm-oid`

- Type: `String`
- Used at: [Schema Object](https://spec.openapis.org/oas/v2.0#schema)
- Description: The named field is an OID (ODM identifier), and it uniquely identifies an ODM root entity in a customer landscape. <br/> The technical type can be UUID or String (typical length 128), and the value must be stable and unique at least within type and landscape (better globally). An entity may have other IDs, i.e. a local ID and other alternative IDs.

Constraints:

- OPTIONAL

Example:

The `x-sap-odm-oid` custom field points to the `oid` property which contains the actual OID.

```json
{
    "components": {
        "schemas": {
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
}
```

[![REUSE status](https://api.reuse.software/badge/github.com/SAP/openapi-specification)](https://api.reuse.software/info/github.com/SAP/openapi-specification)

# OpenAPI Specification for SAP Ecosystem

This repository contains extensions to the original [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) which are relevant for SAP Ecosystem and corresponding tooling. Additionally, it provides a compiled "ready to use" version of schema files which includes the original schemas with SAP-specific changes on top.

The following versions of OpenAPI Specification are supported:

- [OpenAPI Specification v2.0 for SAP Ecosystem](./sap-schemas/v2.0) (based on [OpenAPI v2.0](https://spec.openapis.org/oas/v2.0), also known as Swagger 2.0)
- [OpenAPI Specification v3.0 for SAP Ecosystem](./sap-schemas/v3.0) (based on [OpenAPI v3.0.3](https://spec.openapis.org/oas/v3.0.3))

Every OpenAPI Specification for SAP Ecosystem document is also a valid OpenAPI document of a corresponding version.

The goal of these specification is to describe SAP's extensions to OpenAPI Specifications in a standardized way. The specification are used by [SAP API Business Hub](https://api.sap.com) and other tooling in SAP Ecosystem.

## Requirements

Each schema in this repository is described using JSON format.

No specific tools are needed to use these schema files.

Contributors to this repository will need to run the generator, which requires Node.js to be installed.

## Known Issues

No known issues.

## Primitive Type Mapping

OpenAPI is based on the JSON type system and uses the `format` keyword for differentiating JSON types, and in some cases additional keywords:

| [ABAP][abap]  | [CAP][cap]          | Java                 | [OData][odata]     | [SQL][hana]                              | OpenAPI type    | [OpenAPI format][formats] | OpenAPI keywords                   |
| ------------- | ------------------- | -------------------- | ------------------ | ---------------------------------------- | --------------- | ------------------------- | ---------------------------------- |
| RAW16, CHAR32 | UUID                | java.lang.String     | Edm.Guid           | VARBINARY(16), VARCHAR(32), NVARCHAR(36) | string          | uuid                      | -                                  |
| ABAP_BOOL     | Boolean             | boolean              | Edm.Boolean        | BOOLEAN                                  | boolean         | -                         | -                                  |
| b             | UInt8               | short                | Edm.Byte           | TINYINT                                  | integer         | uint8                     | -                                  |
| -             | -                   | short                | Edm.SByte          | TINYINT                                  | integer         | int8                      | -                                  |
| s             | Int16               | short                | Edm.Int16          | SMALLINT                                 | integer         | int16                     | -                                  |
| i             | Int32, Integer      | int                  | Edm.Int32          | INTEGER                                  | integer         | int32                     | -                                  |
| int8          | Int64, Integer64    | long                 | Edm.Int64          | BIGINT                                   | string, integer | int64                     | -                                  |
| decfloat34    | Decimal             | java.math.BigDecimal | Edm.Decimal        | DECIMAL                                  | string, number  | decimal128                | -                                  |
| p             | Decimal(p,s)        | java.math.BigDecimal | Edm.Decimal        | DECIMAL(p,s)                             | string, number  | decimal                   | [x-sap-precision, x-sap-scale][ps] |
| f             | Double              | double               | Edm.Double         | DOUBLE                                   | number          | double                    |                                    |
| d             | Date                | java.time.LocalData  | Edm.Date           | DATE                                     | string          | date                      | -                                  |
| -             | -                   | java.time.Duration   | Edm.Duration       | -                                        | string          | duration                  | -                                  |
| t             | Time                | java.time.LocalTime  | Edm.TimeOfDay      | TIME                                     | string          | (time)                    | -                                  |
| utclong       | DateTime, Timestamp | java.time.Instant    | Edm.DateTimeOffset | TIMESTAMP                                | string          | date-time                 | -                                  |
| string        | String              | java.lang.String     | Edm.String         | NVARCHAR                                 | string          | -                         | -                                  |
| c, n          | String(n)           | java.lang.String     | Edm.String         | NVARCHAR(n)                              | string          | -                         | maxLength: n                       |
| xstring       | Binary              | byte[]               | Edm.Binary         | VARBINARY                                | string          | base64url                 | -                                  |
| x             | Binary(n)           | byte[]               | Edm.Binary         | VARBINARY(n)                             | string          | base64url                 | maxLength: n                       |
| xstring       | LargeBinary         | byte[]               | Edm.Binary         | BLOB                                     | string          | base64url                 | -                                  |
| string        | LargeString         | java.lang.String     | Edm.String         | NCLOB                                    | string          | -                         | -                                  |

[abap]: https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/index.htm?file=abendata_types.htm
[cap]: https://cap.cloud.sap/docs/cds/types
[hana]: https://help.sap.com/docs/SAP_HANA_PLATFORM/4fe29514fd584807ac9f2a04f6754767/20a1569875191014b507cf392724b7eb.html
[odata]: https://docs.oasis-open.org/odata/odata-csdl-json/v4.01/odata-csdl-json-v4.01.html#sec_PrimitiveTypes
[formats]: https://spec.openapis.org/registry/format/index.html
[ps]: https://github.com/SAP/openapi-specification/tree/main/sap-schemas/v3.0#x-sap-precision

## How to obtain support

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Code of Conduct

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone. By participating in this project, you agree to abide by its [Code of Conduct](CODE_OF_CONDUCT.md) at all times.

## Licensing

Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/SAP/openapi-specification).

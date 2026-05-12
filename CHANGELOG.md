# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- `x-sap-ai-hint` extension for Operation Object, Schema Object, and Tag Object. Provides a hint for AI consumers (e.g., LLMs) on how to use or interpret the annotated element, intentionally kept separate from human-readable `description` fields so that end-user-facing documentation and AI-targeted guidance can evolve independently.

---

## 2024-11-18 (#31)

### Changed

- Updated description of `x-sap-dpp-field-semantics` to clarify meaning and usage.

## 2024-10-24 (#32)

### Added

- `x-sap-odm-semantic-key` on Schema Object. A human-readable identifier used to identify business objects by the end-user. Carries an array of key name/values pairs.

## 2024-09-30 (#30)

### Added

- `x-sap-dpp-entity-semantics` on Schema Object. Primary meaning of the personal data in the annotated entity set (`sap:DataSubject`, `sap:DataSubjectDetails`, `sap:Other`).
- `x-sap-dpp-data-subject-role` on Schema Object. Role of the data subjects in the set (e.g. employee, customer).
- `x-sap-dpp-data-subject-role-description` on Schema Object. Language-dependent description of the data subject role.
- `x-sap-dpp-field-semantics` on Schema Object. Primary meaning of personal data in a property; drives audit log tracking.
- `x-sap-dpp-is-potentially-personal` on Schema Object. Flags a property as containing potentially personal data.
- `x-sap-dpp-is-potentially-sensitive` on Schema Object. Flags a property as containing potentially sensitive personal data.

## 2024-06-17 (#23, #25, #26, #27, #28)

### Added

- GitHub Actions CI workflow (build on push/PR) and release workflow (publish to npmjs.com).

### Changed

- Cleaned up npm package metadata and repository URL.

## 2024-06-10 (#24)

### Added

- `x-sap-deprecated-operation` on Operation Object. Carries structured deprecation metadata: `deprecationDate` (RFC 3339 date), and either `successorOperationRef` (URI reference) or `successorOperationId` (operationId string) — exactly one successor field is required.

## 2024-03-26 (#20)

### Added

- `x-sap-operation-intent` on Operation Object. Communicates the semantic intent of an operation (`create-single`, `read-collection`, `update-single`, `upsert-collection`, `action`, etc.).

## 2024-03-01 (#22)

### Added

- `x-sap-ord-id` at OpenAPI Object (root) level. Links the API resource to its corresponding ORD ID using the pattern `<namespace>:apiResource:<name>:<version>`.

## 2024-02-29 (#16)

### Changed

- `x-sap-ext-overview` value items now have a proper JSON Schema: each item can be a plain string or an object with `text` (string) and `format` (`plain` | `markdown`).

## 2024-01-26 (#19)

### Fixed

- Aligned naming of deprecation-related attributes in documentation for consistency across extensions.

## 2024-01-17 (#18)

### Changed

- Improved the primitive type mapping table in README with corrected JSON examples.

## 2023-11-16 (#17)

### Added

- `x-sap-odm-oid-reference-entity-name` on Schema Object. Specifies the ODM entity name of a referenced entity on a property that holds a foreign OID reference.

## 2023-04-21 (#13)

### Added

- Primitive type mapping table in README covering ABAP, CAP, Java, OData, SQL, and OpenAPI type/format correspondences.

## 2023-04-04 (#9, #10, #11, #12)

### Added

- `x-sap-root-entity` on Schema Object. Boolean flag indicating that the annotated schema is a root entity (a globally addressable business object root).

### Fixed

- Corrected examples in the OpenAPI v2.0 schema documentation.
- Removed incorrect DECFLOAT34 example from the type mapping.

## 2023-02-28 (#4)

### Changed

- **Breaking**: removed lowercase enum values (`rest`, `soap`, `odata`, `odatav4`) from `x-sap-api-type`. Only uppercase values (`REST`, `SOAP`, `ODATA`, `ODATAV4`) are now valid.

## 2023-02-24 (#3)

### Added

- `x-sap-precision` on Schema Object. Maximum number of significant decimal digits (integer ≥ 1).
- `x-sap-scale` on Schema Object. Maximum number of decimal digits to the right of the decimal point (integer ≥ 0).

## 2023-02-10

### Added

- `x-sap-odm-entity-name` on Schema Object. Name of the ODM entity concept the schema represents, used by consumers to find APIs exposing the same entity.
- `x-sap-odm-oid` on Schema Object. Marks the annotated field as the ODM Object Identifier (OID) that uniquely identifies an ODM root entity across a customer landscape.

## 2022-11-29 — Initial release

### Added

- OpenAPI v2.0 and v3.0 SAP extension schemas with generator toolchain (`src/generate-specs.ts`).
- Root-level extensions (OpenAPI Object):
  - `x-sap-compliance-level` — expected compliance level (`sap:base:v1`, `sap:core:v1`, `sap:core:v2`).
  - `x-sap-shortText` — short display description of the API.
  - `x-sap-software-min-version` — minimum required software version.
  - `x-sap-api-type` — API protocol type (`REST`, `SOAP`, `ODATA`, `ODATAV4`).
  - `x-sap-ext-overview` — stakeholder-specific metadata as name/values pairs.
  - `x-sap-stateInfo` — API lifecycle state (`Beta`, `Active`, `Deprecated`, `Decommissioned`) with optional deprecation and decommission dates and a successor URL.
  - `x-sap-direction` — API traffic direction (`inbound`, `outbound`, `mixed`).
  - `x-sap-extensible` — extensibility metadata with `supported` (`no`, `manual`, `automatic`) and optional `description`.
- OAuth flow URL relaxation: `authorizationUrl`, `tokenUrl`, and `refreshUrl` made non-required to accommodate SAP-specific flows.

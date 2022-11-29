# OpenAPI Specification for SAP Ecosystem

This repository contains extensions to the original [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) which are relevant for SAP Ecosystem and corresponding tooling. Additionally, it provides a compiled "ready to use" version of schema files which includes the original schemas with SAP-specific changes on top.

The following versions of OpenAPI Specification are supported:
* [OpenAPI Specification v2.0 for SAP Ecosystem](./sap-schemas/v2.0) (based on [OpenAPI v2.0](https://spec.openapis.org/oas/v2.0), also known as Swagger 2.0)
* [OpenAPI Specification v3.0 for SAP Ecosystem](./sap-schemas/v3.0) (based on [OpenAPI v3.0.3](https://spec.openapis.org/oas/v3.0.3))

Every OpenAPI Specification for SAP Ecosystem document is also a valid OpenAPI document of a corresponding version.

The goal of these specification is to describe SAP's extensions to OpenAPI Specifications in a standartized way. The specification are used by [SAP API Business Hub](https://api.sap.com) and other tooling in SAP Ecosystem.

## Requirements

Each schema in this repository is described using JSON format.

No specific tools are needed to use these schema files.

Contributors to this repository will need to run the generator, which requires Node.js to be installed.

## Known Issues

No known issues.

## How to obtain support

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Code of Conduct

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone. By participating in this project, you agree to abide by its [Code of Conduct](CODE_OF_CONDUCT.md) at all times.

## Licensing

Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/SAP/openapi-specification).

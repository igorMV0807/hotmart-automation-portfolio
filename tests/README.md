# Sanitized Postman/Newman assets

No collection, environment, fixtures, runner configuration, or report was provided.

When the isolated copies become available:

- Replace all environment values with placeholders.
- Point requests only to localhost or a dedicated sandbox.
- Remove auth headers, tokens, cookies, production URLs, IDs, request/response examples, and console output.
- Use synthetic fixtures.
- Regenerate reports after sanitization; never reuse a production report.
- Make any public test-count/pass-rate claim match the committed report exactly.

Suggested structure after review:

```text
tests/
├── postman/
│   ├── public-demo.collection.json
│   └── public-demo.environment.json
├── fixtures/
│   └── synthetic-event.json
└── reports/
    └── README.md
```


# Sanitized database artifacts

No Supabase schema, migration, policy, function, trigger, or seed file was provided.

Publish only a minimal reproducible subset created from an isolated review. Do not publish a production dump. Use synthetic table/column examples when real names reveal business logic or customer information. Review RLS policies, comments, migration history, function bodies, storage paths, and seed data for identifiers and secrets.

Suggested structure after review:

```text
database/
├── migrations/
│   └── 0001_public_demo_schema.sql
├── seed/
│   └── synthetic_demo_data.sql
└── README.md
```


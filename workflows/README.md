# Sanitized n8n workflow / Workflow n8n sanitizado

`hotmart-recovery-engine.sanitized.json` was derived from the supplied inactive export without accessing n8n or production.

## Safety transformations

- workflow remains inactive;
- all 22 nodes are disabled;
- credential fields are absent;
- original workflow/node/condition UUIDs were regenerated or removed;
- export metadata and version ID were removed;
- pinned/static execution data is absent;
- no customer payload or production endpoint is included.

## Verified behavior retained for inspection

- five-minute schedule;
- eligible-journey lookup;
- due-time check;
- three-stage switch;
- previous-send lookup by journey, flow, and stage;
- status-aware email preparation;
- Gmail send path;
- send-log creation;
- journey-state update.

## Import rule

Import only into a disposable n8n instance. Do not attach credentials or enable nodes unless every database, mailbox, and endpoint is a dedicated sandbox. The file is intended for architecture review and screenshots, not execution.


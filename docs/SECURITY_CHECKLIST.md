# Public release security checklist / Checklist de segurança para publicação

[Português (Brasil)](SECURITY_CHECKLIST.pt-BR.md) · English

Use this as a blocking release gate. A single unresolved item keeps the repository private.

Use isto como uma barreira obrigatória. Um único item não resolvido mantém o repositório privado.

## 1. Isolation / Isolamento

- [ ] Work is being performed only in an offline copy, a new repository, or a clearly isolated branch.
- [ ] No file in this repository is symlinked to production files.
- [ ] No command, test, or demo target points to a production hostname, database, webhook, queue, or API account.
- [ ] All imported n8n workflows are disabled by default.
- [ ] A dedicated local/sandbox environment is used for every demo and test.

## 2. Secrets and access / Segredos e acessos

- [ ] `.env`, credential exports, private keys, certificates, cookies, sessions, and auth headers are absent.
- [ ] n8n credential references, credential IDs/names, instance IDs, webhook paths, and encryption material are removed.
- [ ] Supabase URL, anon/service-role keys, database connection strings, JWT secrets, project ref, and organization identifiers are removed or replaced.
- [ ] Hotmart tokens, webhook verification values, account IDs, product IDs, and app credentials are removed or replaced.
- [ ] Railway project/service/environment IDs, deployment tokens, domains, logs, and variables are removed or replaced.
- [ ] Postman collection variables, environment values, examples, auth helpers, and generated reports contain only test values.
- [ ] Every credential that may have appeared in copied files or Git history has been revoked/rotated.
- [ ] The pre-publication script finishes with no findings.

## 3. Personal, customer, and business data / Dados pessoais, de clientes e do negócio

- [ ] Names, emails, phone numbers, addresses, tax IDs, transaction IDs, IP addresses, and device identifiers are synthetic.
- [ ] Product names, prices, offers, coupons, customer messages, and purchase histories are synthetic or explicitly approved.
- [ ] Database dumps, execution histories, binary payloads, attachments, and raw webhook bodies are excluded.
- [ ] Internal URLs, staff names, organization names, support messages, and operational schedules are removed.
- [ ] Screenshots and videos have been reviewed frame by frame, including browser tabs, bookmarks, notifications, terminals, and URL bars.
- [ ] Image metadata has been stripped when appropriate.

## 4. n8n-specific review

- [ ] Every workflow node has been inspected manually, including disabled nodes, sticky notes, expressions, and sample/pinned data.
- [ ] Credentials are unset; node parameters contain placeholders only.
- [ ] Webhook nodes use test-only paths and cannot receive production traffic.
- [ ] Workflow IDs, tags, folders/projects, execution IDs, and instance metadata are removed where present.
- [ ] Error workflows and sub-workflows have also been reviewed and included only when safe.
- [ ] Community nodes and custom code are identified and license-compatible.

## 5. Supabase and SQL review

- [ ] Only a minimal schema/migration is published; no production dump is present.
- [ ] Seed data is synthetic.
- [ ] RLS examples do not expose internal roles, user IDs, or bypass patterns.
- [ ] Functions, triggers, policies, comments, and migration history contain no secrets or client identifiers.
- [ ] Storage bucket names and object paths are synthetic.

## 6. Tests and reports

- [ ] Tests target only localhost or a dedicated sandbox.
- [ ] Fixtures are synthetic and document their fictional nature.
- [ ] Newman reports are regenerated after sanitization and contain no request/response secrets.
- [ ] Test counts, pass rates, and dates in public copy exactly match the attached sanitized report.
- [ ] Failure examples cannot trigger emails, purchases, customer updates, or other external side effects.

## 7. Claims, ownership, and licensing / Afirmações, propriedade e licenças

- [ ] Every architecture statement has been verified against the sanitized source.
- [ ] Every metric has a source, time window, definition, and permission to publish.
- [ ] Client/employer names and testimonials have written approval, if used.
- [ ] Third-party templates, code, icons, screenshots, and fonts permit redistribution.
- [ ] A license is added only after ownership and intended reuse terms are confirmed.
- [ ] The facts and gaps register contains no unresolved public claim.

## 8. Git history and final review / Histórico Git e revisão final

- [ ] All commits—not only the current tree—have been scanned for secrets and personal data.
- [ ] Generated archives and releases have been inspected separately.
- [ ] Repository visibility remains private until two deliberate reviews are complete.
- [ ] The final clone from the would-be public branch contains only intended files.
- [ ] Links in README, badges, demos, and screenshots point only to safe public resources.
- [ ] The owner has approved the exact public snapshot.

## Sign-off / Aprovação

| Review | Person | Date | Commit SHA | Result |
|---|---|---|---|---|
| Technical sanitization |  |  |  |  |
| Privacy/data review |  |  |  |  |
| Claims/evidence review |  |  |  |  |
| Final owner approval |  |  |  |  |

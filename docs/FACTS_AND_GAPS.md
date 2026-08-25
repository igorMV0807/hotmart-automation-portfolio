# Facts and gaps register / Registro de fatos e lacunas

## Verified from supplied files / Verificado nos arquivos

| Claim / Afirmação | Evidence / Evidência | Public wording approved? |
|---|---|---:|
| Recovery workflow has 22 nodes | n8n export | Yes |
| Trigger interval is five minutes | Schedule node | Yes |
| The sequence has three recovery stages | Switch and stage branches | Yes |
| It checks eligibility and due time | Supabase filters and IF node | Yes |
| It looks for an existing stage send | Three `recovery_email_logs` lookups | Yes |
| It sends through Gmail | Three Gmail nodes | Yes |
| It records sends and advances journeys | Supabase create/update nodes | Yes |
| Messages vary by recovery flow | Three preparation nodes | Yes |
| Dashboard is read-only | Source and project manifest | Yes |
| Dashboard uses three named tables | Source/types/manifest | Yes |
| Dashboard avoids invented open/click metrics | Source and README | Yes |
| Public demo is synthetic and disconnected | Portfolio-edition source | Yes |

## Still missing / Ainda ausente

- Upstream Hotmart webhook/ingestion export
- Supabase schema, migrations, indexes, functions, and RLS policies
- Postman collection, environments, Newman configuration, and reports
- Railway services and deployment configuration
- Authorized production screenshots or recordings
- An evidence-backed business result and measurement period
- Ownership confirmation and license choice

## Prohibited claims until evidence arrives / Afirmações proibidas

- “Recovered R$ X” or any conversion/revenue percentage
- “Processes X events per day”
- “100% reliable,” “fault-tolerant,” “production-grade,” or “scalable”
- A Postman/Newman test count or pass rate
- A specific Railway topology
- Exact webhook security, retry, deduplication, or out-of-order guarantees beyond the reviewed workflow

## Safe result wording / Texto seguro sobre resultado

**English:** “The public case demonstrates a three-stage recovery workflow, duplicate-send lookup, state transitions, and a synthetic observability dashboard. Production business metrics remain private and were not used in this case.”

**Português:** “O case público demonstra um workflow de recuperação em três etapas, busca contra repetição de envio, transições de estado e um dashboard sintético de observabilidade. Métricas de negócio de produção continuam privadas e não foram usadas neste case.”


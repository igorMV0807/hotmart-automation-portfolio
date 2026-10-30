# Portfolio case / Case de portfólio

## English version

### Central de Performance

**A three-stage purchase-recovery workflow with duplicate-send checks, state tracking, and a read-only observability dashboard.**

#### The problem

Purchase journeys can stop in several states—abandoned, awaiting payment, canceled, delayed, or expired. Following each case manually makes timing, consistency, and traceability difficult.

#### The solution

I built a 22-node n8n workflow that runs every five minutes and retrieves eligible journeys from Supabase. It checks whether recovery is due, selects one of three follow-up stages, looks for an existing send for the same journey/flow/stage, prepares status-aware copy, sends through Gmail, records the message, and advances the journey state.

I also built a read-only Next.js dashboard for recovery metrics, journey timelines, email logs, and event-processing visibility. The public edition uses synthetic data and never connects to the running system.

#### Key engineering decisions

- **Stage-specific send lookup:** reduces repeated deliveries for the same journey, flow, and stage.
- **State stored in Supabase:** makes the next action and previous sends traceable.
- **Status-aware copy:** adapts the recovery message to the purchase state.
- **Read-only dashboard:** adds operational visibility without changing backend records.
- **No fabricated engagement metrics:** open, click, and CTR are excluded because the reviewed backend does not record them.
- **Safe public mode:** synthetic data is the default; workflow nodes and external integrations are disabled.

#### Verified result

The available artifacts demonstrate the full three-stage decision flow, duplicate-send lookup, Gmail delivery path, Supabase state transitions, and dashboard calculations. Production revenue and conversion metrics were not included, so this case does not claim business impact.

#### Stack

n8n · Supabase · Gmail · Next.js · TypeScript · Tailwind CSS · Recharts

#### What I learned

Building automation that can be explained and observed is as important as building the happy path. The strongest part of this project is not a single integration—it is the connection between eligibility, timing, stage state, send history, and operational visibility.

## Versão em português

### Central de Performance

**Workflow de recuperação de compras em três etapas, com proteção contra repetição de envio, controle de estado e dashboard de observabilidade.**

#### O problema

Jornadas de compra podem parar em vários estados: abandonada, aguardando pagamento, cancelada, atrasada ou expirada. Acompanhar cada caso manualmente dificulta o timing, a consistência e a rastreabilidade.

#### A solução

Construí um workflow n8n com 22 nodes que roda a cada cinco minutos e busca jornadas elegíveis no Supabase. Ele verifica se chegou o horário, seleciona uma das três etapas, procura um envio anterior para a mesma jornada/fluxo/etapa, prepara a mensagem de acordo com o status, envia pelo Gmail, registra o envio e avança o estado da jornada.

Também construí um dashboard Next.js somente de leitura para métricas de recuperação, linhas do tempo, logs de email e visibilidade do processamento de eventos. A edição pública usa dados sintéticos e nunca se conecta ao sistema em execução.

#### Decisões técnicas importantes

- **Busca por envio da mesma etapa:** reduz entregas repetidas para a mesma jornada, fluxo e etapa.
- **Estado persistido no Supabase:** deixa a próxima ação e os envios anteriores rastreáveis.
- **Mensagem por status:** adapta a recuperação à situação da compra.
- **Dashboard somente leitura:** adiciona visibilidade operacional sem alterar registros do backend.
- **Nenhuma métrica inventada:** abertura, clique e CTR foram excluídos porque o backend revisado não registra esses eventos.
- **Modo público seguro:** dados sintéticos são o padrão; nodes e integrações externas ficam desativados.

#### Resultado comprovado

Os artefatos demonstram o fluxo completo de três etapas, a busca contra repetição, o caminho de envio pelo Gmail, as transições no Supabase e os cálculos do dashboard. Como métricas de produção não foram fornecidas, este case não afirma impacto financeiro.

#### Stack

n8n · Supabase · Gmail · Next.js · TypeScript · Tailwind CSS · Recharts

#### O que aprendi

Construir uma automação que pode ser explicada e observada é tão importante quanto construir o caminho feliz. A parte mais forte do projeto não é uma integração isolada: é a conexão entre elegibilidade, tempo, etapa, histórico de envios e visibilidade operacional.


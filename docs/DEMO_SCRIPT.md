# 60–90 second demo / Demo de 60–90 segundos

The safest demo shows the synthetic dashboard and the disabled n8n workflow. It does not execute a workflow, connect credentials, open Supabase, or show production screens.

A demo mais segura mostra o dashboard sintético e o workflow n8n desativado. Ela não executa o workflow, não conecta credenciais, não abre o Supabase e não mostra telas de produção.

## Roteiro em português (aproximadamente 80 segundos)

| Tempo | Visual | Narração |
|---:|---|---|
| 0–8s | Título e diagrama | “Eu construí um motor automatizado de recuperação de compras com n8n, Supabase, Gmail e um dashboard em Next.js.” |
| 8–22s | Visão geral do workflow n8n, sem executar | “A cada cinco minutos, o workflow procura jornadas elegíveis e verifica se chegou o momento da próxima ação.” |
| 22–36s | Mostrar o switch e os três ramos | “O sistema escolhe uma de três etapas e, antes do envio, procura um registro com a mesma jornada, fluxo e etapa para evitar repetição.” |
| 36–47s | Mostrar nodes de preparação, Gmail e atualização | “A mensagem muda conforme o status da compra. Depois, o envio é registrado e a jornada avança para a próxima etapa.” |
| 47–66s | Dashboard sintético: cards, gráficos e jornadas | “Este dashboard somente de leitura mostra recuperação, receita, emails, fluxos, eventos e a linha do tempo de cada jornada.” |
| 66–75s | Banner de dados sintéticos e tela de eventos | “A demo pública usa somente dados fictícios e não se conecta a produção.” |
| 75–85s | README e arquitetura | “No repositório, documentei a arquitetura, os limites da evidência e as decisões de segurança da versão pública.” |

## English script (about 80 seconds)

| Time | Visual | Voice-over |
|---:|---|---|
| 0–8s | Title and architecture | “I built an automated purchase-recovery engine with n8n, Supabase, Gmail, and a Next.js dashboard.” |
| 8–22s | Full disabled n8n workflow | “Every five minutes, the workflow looks for eligible journeys and checks whether the next action is due.” |
| 22–36s | Switch plus three branches | “It selects one of three stages and checks the journey, flow, and stage log before sending to prevent a repeated delivery.” |
| 36–47s | Message, Gmail, and update nodes | “The message changes with the purchase state. The send is recorded, and the journey advances to its next step.” |
| 47–66s | Synthetic dashboard | “This read-only dashboard makes recoveries, revenue, emails, flows, events, and journey timelines visible.” |
| 66–75s | Synthetic-data banner | “The public demo uses fictional data only and never connects to production.” |
| 75–85s | README and architecture | “The repository documents the architecture, evidence boundary, and public-release security decisions.” |

## Recording checklist / Checklist de gravação

- [ ] `PORTFOLIO_DEMO_MODE=true` is visible in `.env.local` without showing other files.
- [ ] Browser notifications, bookmarks, account menus, and URL suggestions are hidden.
- [ ] The imported workflow name starts with `[PORTFOLIO — DISABLED]`.
- [ ] All workflow nodes visibly remain disabled.
- [ ] No Execute button is pressed.
- [ ] Only `example.com` identities and `DEMO-*` identifiers appear.
- [ ] No Supabase, Gmail, Hotmart, Railway, or production dashboard is opened.
- [ ] The final video is reviewed frame by frame before publication.


# LinkedIn content / Conteúdo para LinkedIn

## Post de lançamento — Português

**Transformei um workflow complexo de recuperação Hotmart em um case público sem tocar no sistema em execução.**

O sistema possui 22 nodes no n8n e trabalha em três etapas.

A cada cinco minutos, ele:

1. busca jornadas elegíveis no Supabase;
2. verifica se chegou o horário da próxima ação;
3. seleciona a etapa correta;
4. procura um envio anterior para a mesma jornada, fluxo e etapa;
5. prepara a mensagem conforme o status da compra;
6. envia pelo Gmail;
7. registra o envio e atualiza a jornada.

Também construí um dashboard Next.js somente de leitura para acompanhar jornadas, emails, eventos e métricas de recuperação.

Para publicar o projeto com segurança, criei uma edição totalmente separada: todos os nodes estão desativados, credenciais e identificadores originais foram removidos, e a demo usa apenas dados sintéticos.

Não estou publicando números de receita ou conversão porque os artefatos disponíveis não comprovam esses resultados. Prefiro mostrar exatamente o que o código demonstra.

Demo: **https://igor-marques-hotmart-recovery-demo.igormarques457.chatgpt.site**  
Código e case completo: **https://github.com/igorMV0807/hotmart-automation-portfolio**

## Launch post — English

**I turned a complex Hotmart recovery workflow into a public engineering case without touching the running system.**

The n8n workflow contains 22 nodes and a three-stage sequence.

Every five minutes, it:

1. retrieves eligible journeys from Supabase;
2. checks whether the next action is due;
3. selects the correct stage;
4. looks for an existing send for the same journey, flow, and stage;
5. prepares status-aware copy;
6. sends through Gmail;
7. records the delivery and advances the journey.

I also built a read-only Next.js dashboard for journey, email, event, and recovery visibility.

For safe publication, I created a separate edition: all workflow nodes are disabled, original credentials and identifiers are absent, and the demo uses synthetic data only.

I am not publishing revenue or conversion claims because the available artifacts do not verify them. I would rather show exactly what the implementation demonstrates.

Demo: **https://igor-marques-hotmart-recovery-demo.igormarques457.chatgpt.site**  
Code and full case: **https://github.com/igorMV0807/hotmart-automation-portfolio**

## Série de posts / Follow-up series

| Post | Gancho sugerido | Prova visual segura |
|---:|---|---|
| 1 | “Como evitei repetir a mesma etapa de recuperação” | Nodes de busca por jornada/fluxo/etapa, todos desativados |
| 2 | “Como organizei uma automação em três etapas” | Switch e três branches do workflow |
| 3 | “Por que meu dashboard não mostra CTR” | Tela de emails + explicação de métricas não registradas |
| 4 | “Como transformei produção em um case público seguro” | Comparação estrutural sem mostrar os arquivos originais |
| 5 | “Um dashboard somente leitura para investigar eventos” | Tela sintética de eventos e erros |
| 6 | “Arquitetura completa do motor de recuperação” | Diagrama revisado |

## Regras de publicação

- Nunca mostre produção, credenciais ou nodes ativos.
- Identidades visíveis devem terminar em `example.com`; IDs devem começar com `DEMO-`.
- Não diga que o sistema é “à prova de falhas”, “escalável” ou “seguro” sem critério mensurável.
- Não publique receita, conversão, volume ou taxa de testes sem evidência autorizada.
- Não atribua Postman/Newman ou Railway à versão pública enquanto os arquivos não forem fornecidos.

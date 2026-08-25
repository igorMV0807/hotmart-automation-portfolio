# Checklist de segurança para publicação

Português (Brasil) · [English](SECURITY_CHECKLIST.md)

Use este documento como uma barreira obrigatória: um único item não resolvido mantém o repositório privado.

## 1. Isolamento

- [ ] Todo o trabalho acontece somente em uma cópia offline, repositório novo ou branch claramente isolada.
- [ ] Nenhum arquivo deste repositório é um link para arquivos de produção.
- [ ] Nenhum comando, teste ou demo aponta para hostname, banco, webhook, fila ou conta de API de produção.
- [ ] Todos os workflows n8n importados estão desativados por padrão.
- [ ] Todas as demos e testes usam ambiente local ou sandbox dedicado.

## 2. Segredos e acessos

- [ ] Não há `.env`, exports de credenciais, chaves privadas, certificados, cookies, sessões ou headers de autenticação.
- [ ] Referências, IDs e nomes de credenciais do n8n, IDs da instância, caminhos de webhook e material de criptografia foram removidos.
- [ ] URL, chaves anon/service-role, string do banco, JWT secret, project ref e identificadores do Supabase foram removidos ou substituídos.
- [ ] Tokens, validação de webhook, IDs de conta/produto e credenciais da Hotmart foram removidos ou substituídos.
- [ ] IDs de projeto/serviço/ambiente, tokens, domínios, logs e variáveis do Railway foram removidos ou substituídos.
- [ ] Variáveis, environments, exemplos, helpers de autenticação e relatórios do Postman contêm somente valores de teste.
- [ ] Toda credencial que possa ter aparecido na cópia ou no histórico Git foi revogada/trocada.
- [ ] O verificador de pré-publicação termina sem alertas.

## 3. Dados pessoais, de clientes e do negócio

- [ ] Nomes, emails, telefones, endereços, documentos, transações, IPs e identificadores de dispositivos são sintéticos.
- [ ] Produtos, preços, ofertas, cupons, mensagens e históricos de compra são sintéticos ou tiveram publicação aprovada.
- [ ] Dumps de banco, históricos de execução, payloads binários, anexos e webhooks brutos estão excluídos.
- [ ] URLs internas, nomes da equipe/empresa, mensagens de suporte e horários operacionais foram removidos.
- [ ] Screenshots e vídeos foram revisados frame a frame, incluindo abas, favoritos, notificações, terminais e barra de endereço.
- [ ] Metadados de imagens foram removidos quando necessário.

## 4. Revisão específica do n8n

- [ ] Cada node foi revisado manualmente, inclusive nodes desativados, notas, expressões e dados fixados/amostrais.
- [ ] As credenciais estão desvinculadas e os parâmetros contêm somente placeholders.
- [ ] Nodes de webhook usam caminhos exclusivos de teste e não recebem tráfego de produção.
- [ ] IDs, tags, pastas/projetos, IDs de execução e metadados de instância foram removidos quando presentes.
- [ ] Workflows de erro e sub-workflows também foram revisados.
- [ ] Community nodes e código personalizado foram identificados e têm licenças compatíveis.

## 5. Revisão do Supabase e SQL

- [ ] Somente um schema/migration mínimo é publicado; não há dump de produção.
- [ ] Seeds contêm dados sintéticos.
- [ ] Exemplos de RLS não expõem roles internas, IDs de usuários ou formas de bypass.
- [ ] Functions, triggers, policies, comentários e migrations não contêm segredos ou identificadores de clientes.
- [ ] Buckets e caminhos de objetos são sintéticos.

## 6. Testes e relatórios

- [ ] Os testes apontam somente para localhost ou sandbox dedicada.
- [ ] Fixtures são sintéticas e deixam isso explícito.
- [ ] Relatórios Newman foram gerados novamente após a sanitização e não contêm segredos nas requisições/respostas.
- [ ] Quantidades, taxas de aprovação e datas divulgadas correspondem exatamente ao relatório sanitizado.
- [ ] Testes de falha não podem disparar emails, compras, atualizações de clientes ou outro efeito externo.

## 7. Afirmações, propriedade e licenças

- [ ] Todas as afirmações de arquitetura foram verificadas na cópia sanitizada.
- [ ] Toda métrica tem fonte, período, definição e permissão para publicação.
- [ ] Nomes/logos de clientes ou empregadores e depoimentos têm aprovação escrita, caso usados.
- [ ] Templates, código, ícones, screenshots e fontes de terceiros permitem redistribuição.
- [ ] Uma licença só será adicionada após confirmar a propriedade e os termos desejados.
- [ ] O registro de fatos e lacunas não contém afirmações públicas sem evidência.

## 8. Histórico Git e revisão final

- [ ] Todos os commits, não apenas os arquivos atuais, foram examinados contra segredos e dados pessoais.
- [ ] Arquivos compactados e releases foram inspecionados separadamente.
- [ ] O repositório continua privado até duas revisões intencionais serem concluídas.
- [ ] Um clone final da futura branch pública contém somente os arquivos pretendidos.
- [ ] Links, badges, demos e screenshots apontam apenas para recursos públicos seguros.
- [ ] O proprietário aprovou exatamente o snapshot que será publicado.

## Aprovação

| Revisão | Pessoa | Data | Commit SHA | Resultado |
|---|---|---|---|---|
| Sanitização técnica |  |  |  |  |
| Privacidade/dados |  |  |  |  |
| Afirmações/evidências |  |  |  |  |
| Aprovação final do proprietário |  |  |  |  |


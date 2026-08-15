# nodejs-test-repo

App Node.js simples (Express) para praticar CI/CD na AWS — pensado para o exame **AWS Certified DevOps Engineer – Professional**.

## Rodando localmente

```bash
npm install
npm start        # sobe em http://localhost:3000
npm test         # roda os testes
```

Rotas:

- `GET /` — mensagem de boas-vindas + versão + hostname
- `GET /health` — health check (usado pelo CodeDeploy `ValidateService`)

## Arquivos para o pipeline AWS

- **buildspec.yml** — usado pelo **CodeBuild**: instala dependências, roda os testes e gera o artefato de build.
- **appspec.yml** + **scripts/** — usados pelo **CodeDeploy** (deploy em EC2 via agent):
  - `before_install.sh` — instala Node.js na instância e limpa o diretório de deploy
  - `after_install.sh` — instala as dependências do app
  - `start_app.sh` / `stop_app.sh` — sobe/derruba o app com `pm2`
  - `validate_service.sh` — valida o deploy chamando `/health`

## Ideia de pipeline no CodePipeline

1. **Source**: CodeCommit/GitHub (este repo)
2. **Build**: CodeBuild usando `buildspec.yml`
3. **Deploy**: CodeDeploy (grupo de implantação apontando para uma instância EC2 com o agente do CodeDeploy instalado, IAM role com permissão de acesso ao S3 do artefato)

Isso cobre o fluxo básico de: source → build/test → deploy, útil para praticar CodePipeline, CodeBuild e CodeDeploy antes da prova.

# GamePortal - Fullstack Assessment

- **Admin Portal:** https://game.nflabs.org
- **API Docs:** https://api-game.nflabs.org

## Configuration

```bash
git clone --depth 1 https://github.com/itsdeekha/game-admin-portal.git
cd game-admin-portal/
make cp-env
```

## S3 Configuration

```bash
# backend/.env

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_REGION=
AWS_DEFAULT_S3_BUCKET=
```

## Run with Docker

Run API

```bash
make run-api
```

Run UI

```bash
make run-ui
```

## Links:

- **Admin Portal:** http://127.0.0.1:3000
- **API Docs:** http://127.0.0.1:8000

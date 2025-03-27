# Database Migration Guide

In case of an update to `prisma/schema.prisma` in this repo, you should run the below command to migrate the old database.

Each update to this file is guaranteed to work with the previous version of the file to ensure maximum compatibility. While every effort has been made to ensure compatibility, we are not responsible for any data loss.

```bash
npx prisma migrate dev --name update-schema # Migrate
npx prisma migrate deploy # Deploy
```
# Jarrod Starter Template

<img src="robot-helper.jpg" width="500" height="auto" alt="Turbo Repo starter"  />

This is a starter for setting up your own turborepo project.
For convenience you can select which auth type you want (`next-auth` or `clerk`) and which database you want (`psql` or `sqlite`).

```
mkdir test-project
cd test-project
pnpm link ../jarrod-starter
pnpm create-jarrod-starter
```

Once the project is created you can run the following commands:

```
pnpm install
pnpm run web
```

Make sure to set your environment variables from the .env.example files.
Follow the readme in the template_main folder for more instructions.

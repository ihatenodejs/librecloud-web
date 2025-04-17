# Editing Documentation

You can freely modify the LibreCloud documentation on our [repository](https://git.pontusmail.org/librecloud/web), in the `docs/` folder. We encourage contributions of all kinds!

## Editing Guidelines

- Have common sense, please.
- Obviously, this is not the place to rant about your political beliefs or spread hate.
- Test the instructions/docs you write, if possible.
- Yeah, just have common sense

Just be sure to link your new pages in `docs/_sidebar.md` so people can find them!

## Serving Docs

You might want to serve the docs you've edited to see how they'll look on [docs.librecloud.cc](https://docs.librecloud.cc). No fear, Docsify is here!

Do this with the `docsify-cli`, which can be installed like so:

### Bun

```bash
# This will be installed globally
bun i docsify-cli -g
```

### NPM

```bash
# This will be installed globally
npm i docsify-cli -g
```

Finally, you can serve the docs with this command:

```bash
docsify serve docs
```

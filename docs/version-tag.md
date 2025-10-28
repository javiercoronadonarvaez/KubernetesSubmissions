In order to create release and tags directly from the console, perform the following steps:

```bash
git add -A
```

```bash
git commit -m "chore(release): 1.1"
```

```bash
git push origin HEAD
```

```bash
gh release create 1.1 --target main --generate-notes
```

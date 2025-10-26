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
git tag -a 1.1 -m "Release 1.1"
```

```bash
git push origin 1.1
```

```bash
gh release create 1.1 --generate-notes
```

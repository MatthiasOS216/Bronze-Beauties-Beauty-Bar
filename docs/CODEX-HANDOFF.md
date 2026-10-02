# Codex hand-off: create the `bronze-beauties-web` repository

Paste everything below the line into Codex.

---

Create a new GitHub repository for the Bronze Beauties website and move the finished site into it. The code already exists and is tested; do not modify it.

**Source:** `MatthiasOS216/aegis-os`, branch `claude/bronze-beauties-discovery`, folder `bronze-beauties-web/` (a complete Next.js 16 app).
**Target:** a new **private** repo `MatthiasOS216/bronze-beauties-web`, default branch `main`, with the contents of that folder at the repo root and its git history preserved.

Steps:

```bash
git clone --branch claude/bronze-beauties-discovery https://github.com/MatthiasOS216/aegis-os.git bb-src
cd bb-src
git subtree split --prefix=bronze-beauties-web -b site-main
gh repo create MatthiasOS216/bronze-beauties-web --private --description "Custom Next.js website for Bronze Beauties Beauty Bar (Elyria, OH)"
git push https://github.com/MatthiasOS216/bronze-beauties-web.git site-main:main
```

Then verify in a fresh clone of the new repo:

```bash
git clone https://github.com/MatthiasOS216/bronze-beauties-web.git && cd bronze-beauties-web
test -f package.json && test -f app/page.tsx && test -f .github/workflows/ci.yml   # folder contents are at the root
npm ci && npm run lint && npm run typecheck && npm run build
```

Rules:
- Do not change, merge, or close anything in `aegis-os`. Claude will close PR #8 there after confirming the new repo.
- Do not touch DNS, Squarespace, or Vercel.
- Report back: the new repo URL, the commit SHA on `main`, and the output of the lint/typecheck/build commands.

If `gh` isn't authenticated, create the empty private repo `bronze-beauties-web` in the GitHub web UI (no README, no license, no .gitignore), then run only the `git push` line.

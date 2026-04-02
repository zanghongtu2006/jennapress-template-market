$repo = "C:\Users\hongtu\.openclaw\workspace-alex\jennapress-template-market"

# Remove all remaining saas-landing files from disk
Get-ChildItem "$repo\templates\saas-landing" -Recurse -File | Remove-Item -Force -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$repo\templates\saas-landing" -ErrorAction SilentlyContinue

# Remove corporate-basic entirely
Remove-Item -Recurse -Force "$repo\templates\corporate-basic" -ErrorAction SilentlyContinue

# Git rm old content pages (relative to repo root)
git -C $repo rm -f content/pages/about.md
git -C $repo rm -f content/pages/principles.md
git -C $repo rm -f content/pages/submit.md
git -C $repo rm -rf content/pages/de
git -C $repo rm -rf content/pages/el
git -C $repo rm -rf content/pages/es
git -C $repo rm -rf content/posts

# Stage everything
git -C $repo add -A

# Status check
git -C $repo status --short

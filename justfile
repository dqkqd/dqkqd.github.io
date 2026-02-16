new_blog filename:
  bash ./scripts/new_blog.sh {{ filename }}

style:
  npm run format
  npm run lint::fix

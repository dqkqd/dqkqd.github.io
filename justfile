new_blog filename:
  bash ./scripts/new_blog.sh {{ filename }}

style:
  npm run format
  npm run lint::fix

remove_unused_assets:
  grep -vFf <(rg -N -I -o -r 'src/assets/$1' '"\.\./assets/([^"/]+\.png)"' src) <(find src/assets -name "*.png") | sort | uniq | xargs rm

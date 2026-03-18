#!/usr/bin/bash

BLOG_FOLDER="src/blog"

FILE="$BLOG_FOLDER/$1.mdx"

if [ -e "$FILE" ]; then
  echo "Error: File '$FILE' already exists."
  exit 1
fi

DATETIME=$(date -u +"%Y-%m-%dT%H:%M:%S%z")

cat >"$FILE" <<EOF
---
title:
pubDatetime: $DATETIME
---
EOF

echo "Created $FILE"

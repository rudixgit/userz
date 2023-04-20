#!/usr/bin/env bash

# Get the list of changed files and save to a file
git diff-tree --no-commit-id --name-only -r HEAD > changed_files.txt

# Loop through each file and find the second directory path
declare -A dirs
while read -r file; do
  # Get the second directory path
  dir=$(echo "$file" | cut -d'/' -f2)
  # Increment the count for this directory
  ((dirs[$dir]++))
done < changed_files.txt

# Find the directory with the highest count
max_count=0
max_dir=""
for dir in "${!dirs[@]}"; do
  count=${dirs[$dir]}
  if (( count > max_count )); then
    max_count=$count
    max_dir=$dir
  fi
done

# Display the directory with the highest count
if [[ -n $max_dir ]]; then
  echo "Directory with the highest count: /example/$max_dir/"
else
  echo "No changes found."
fi
# Display the directory with the highest count
echo ${max_dir}
cd ./apps/${max_dir}
pwd
ls -la 
npm install
npm run build
npm run export
rm -rf ./.next/cache ./.next/static ./app ./styles ./ui ./.github ./.nova ./lib ./src *.ts public package-lock.json ./vscode ./Applications.sketch ./.eslintrc.js ./.npmrc ./pnpm-lock.yaml
git config --global user.email "github-actions[bot]@users.noreply.github.com"
git config --global user.name "Rudix"
git checkout --orphan build
git add --all
git add -A .next out -f
git commit  --allow-empty -n -m  "Add build directory"

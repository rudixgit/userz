#!/bin/bash

# Get the list of changed files
files=$(git diff-tree --no-commit-id --name-only -r HEAD)

# Loop through each file and find the second directory path
declare -A dirs
for file in $files; do
  # Get the second directory path
  dir=$(echo "$file" | cut -d'/' -f2)
  # Increment the count for this directory
  ((dirs[$dir]++))
done

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
  echo "Directory with the highest count:  $max_dir"
else
  echo "No changes found."
fi
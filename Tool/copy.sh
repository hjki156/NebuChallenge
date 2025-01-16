#!/bin/bash

source_dir="./Files/"
target_dir="./ExamView/Files"

if [ ! -d "$target_dir" ]; then
  mkdir -p "$target_dir"
fi

find "$source_dir" -type f -exec cp {} "$target_dir" \;
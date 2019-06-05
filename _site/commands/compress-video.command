#!/bin/bash

# Known issues: 
# This script only support dirs that contains only one .pdf
# Otherwise, all the file would be renamed to "$dir".pdf 

function traverse() {
for file in "$1"/*
do
    if [ ! -d "${file}" ] ; then

        echo "${file} is a file"

        # test arguments
        # echo "$1", "$2"
        
        # var declaration for play
        dir="$(dirname $file)"
        fullname="$(basename $file)"
        ext="${fullname##*.}"
        filename="${fullname%.*}"
        sndext="${filename##*.}"

        echo "dir=$dir"
        echo "fullname=$fullname"
        echo "ext=$ext"
        echo "sndext=$sndext"
        echo "filename=$filename"

        if [ $ext == "mp4" ] ; then
          echo "${file} named ${filename} is a mp4"

          # target
          src=$file
          target="$dir"/"$filename".min.mp4
          echo "$target"

          # run ffmpeg on video 
          # if video has min or is min
          if [ ! -f "$target" ] && [ ! "$sndext" == "min" ] ; then 
            echo ffmpeg -i "$src" -vcodec libx264 -crf 23 "$target"
            ffmpeg -i "$src" -vcodec libx264 -crf 23 "$target"
          fi
        fi

        echo "pwd=$(pwd)"
        echo "------\n"
    else
        echo "entering recursion with: ${file}"
        traverse "${file}" "$1"
    fi
done
}

function main() {
    traverse "$1"
}

main "$1"



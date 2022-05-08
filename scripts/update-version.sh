#!/bin/bash

# $1 = tag version (e.g. v1.0.0)
# $2 = package.json file path to write to

rawTag=$1
packageJsonFile=$2
tag="${rawTag:1}"

jq '.version="'$tag'"' $packageJsonFile > /tmp/package.json
mv /tmp/package.json $packageJsonFile

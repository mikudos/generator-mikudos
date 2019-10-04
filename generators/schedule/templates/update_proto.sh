#!/bin/bash
PROTOPATH=$PWD/proto
# create path if not exist
if [!-d $PROTOPATH]; then
    mkdir -p $PROTOPATH
fi
pushd ../<%=appName%>_protos
echo "update proto files in: $(pwd)"
git pull
sleep 1
cp -r ./proto/* $PROTOPATH
popd
tree ./proto/
echo "proto files are up to date!"

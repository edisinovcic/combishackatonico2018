#!/bin/sh

rm -rf build \
&& truffle-flattener \
contracts/CombisToken.sol contracts/CombisCrowdsale.sol \
 >> contracts/CombisICO.sol \
&&  find contracts -not -name 'Migrations.sol' -not -name 'CombisICO.sol' -not -name 'contracts' -delete \
&& truffle compile


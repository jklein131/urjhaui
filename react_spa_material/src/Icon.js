import React from 'react';
import Initicon from 'react-initicon';
var seedrandom = require('seedrandom');


export default function Icon  ({name, size}) {
  if (name === undefined) {
    name =""
  }
  var rng = seedrandom(name);
  return (
<Initicon size={size} seed={rng()*10} text={name.toUpperCase()} />
  )
}
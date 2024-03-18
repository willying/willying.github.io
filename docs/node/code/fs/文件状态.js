const fs = require('fs')

fs.stat('../资料', (err,data) => {
  if (!err) {
    console.log(data)
  } else {
    console.log(err)
  }
})
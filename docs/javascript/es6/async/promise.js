function fun() {
  p().then(res => {
    console.log(res)
    return new Promise((resolve, reject) => {
      resolve(123)
    }).then(res => {
      return res + 1
    })
  }).then(res => {
    console.log(res)
  })
}

function p() {
  return new Promise((resolve, reject) => {
    resolve(145)
  })
}

fun()
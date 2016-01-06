export let random = (max = 10) => Math.floor(Math.random() * max)
export let randomWhole = (item, max = 10) => {
  let i = null
  do {
    i = random(max)
  } while (i != 0 && item % i != 0)
  return i
}
export let randomNotNull = (max = 10) => {
  while (true) {
    let res = random(max)
    if (res > 0) return res
  }
}
export let isNegative = () => Math.random() * 20 > 10

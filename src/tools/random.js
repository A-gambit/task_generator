export let random = (max = 10) => Math.floor(Math.random() * max)

export let randomWhole = (item, max = 10, notNull) => {
  let i = null
  do {
    i = notNull ? randomMore(0, max) : random(max)
  } while (i != 0 && item % i != 0 && Number.isInteger(i))
  return i
}

export let randomMore = (more = 0, max = 10) => {
  while (true) {
    let res = random(max)
    if (res > more) return res
  }
}

export let isNegative = () => Math.random() * 20 > 10

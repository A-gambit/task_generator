export default (items, key = 'x') => items
  .map((item, index)  => `${item >= 0 ? (index == 0 ? '' : '+ ') : '- '}${Math.abs(item) == 1 ? '' : Math.abs(item)}${key}${index + 1}`
  ).join(' ')
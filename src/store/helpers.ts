export const moveListItemTo = <T>(item: T, to: number, list: T[]): T[] => {
  const i = list.indexOf(item)

  if (to > i) {
    return [...list.slice(0, i), ...list.slice(i + 1, to + 1), item, ...list.slice(to + 1)]
  } else if (to < i) {
    return [...list.slice(0, to), item, ...list.slice(to, i), ...list.slice(i + 1)]
  }

  return list
}

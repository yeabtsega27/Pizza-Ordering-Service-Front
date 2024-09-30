export function datToString(d) {
  const date = new Date(d);
  return date.toString().split(" ").slice(1, 4).join("/");
}

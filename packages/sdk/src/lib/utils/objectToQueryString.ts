export default function (data: object): string {
  return `?${Object.entries(data)
    .map((e: Array<string>) => `${e[0]}=${e[1]}`)
    .join("&")}`;
}

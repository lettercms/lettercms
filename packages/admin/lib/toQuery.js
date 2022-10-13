export default function toQuery(data) {
  return `?${Object.entries(data).map((e) => `${e[0]}=${e[1]}`).join('&')}`;
}


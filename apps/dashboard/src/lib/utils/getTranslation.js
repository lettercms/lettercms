const cache = {};

export default async function getTranslation(promise, key) {
  if (cache[key])
    return cache[key];

  const messages = (await promise).default;

  cache[key] = messages;

  return messages;
}

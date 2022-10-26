export default function getDiff(prev, next) {
  const toAdd = [];
  const toDelete = [];

  next.forEach(e => {
    if (!prev.includes(e))
      toAdd.push(e);
  });
  prev.forEach(e => {
    if (!next.includes(e))
      toDelete.push(e);
  });

  return {
    toAdd,
    toDelete
  };
}

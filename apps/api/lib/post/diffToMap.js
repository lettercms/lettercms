import getArrayDiff from './getArrayDiff';


export default function diffToMap(map, prev, next) {
  const diff = getArrayDiff(prev, next);

  diff.toAdd.forEach(tag => {
    const count = map.get(tag) || 0;

    map.set(tag, count + 1);    
  });

  diff.toDelete.forEach(tag => {
    const count = map.get(tag);

    let newCount = count - 1;

    if (newCount === 0)
      map.delete(tag);
    else
      map.set(tag, newCount); 
  });

  return map;
}
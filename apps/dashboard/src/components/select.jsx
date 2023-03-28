export default function Select({options, ...e}) {
  let _className = 'border border-main-300 py-2 px-4 rounded-md ';

  if (e.className)
    _className += e.className;

  return <select className={_className} {...e}>
    {
      options.map((e, i) => {
        let name = e;
        let value = e;

        if (typeof e === 'object') {
          name = e.name;
          value = e.value;
        }

        return <option key={e + i} value={e}>{e}</option>;
      })
    }
  </select>;
}
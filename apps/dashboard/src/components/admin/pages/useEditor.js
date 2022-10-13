import {useState, useEffect} from 'react';

export default function useEditor(ed) {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (ed)
      setEditor(ed);
  }, [ed]);

  return editor;
}
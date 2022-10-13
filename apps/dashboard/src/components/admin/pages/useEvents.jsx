import {useState, useEffect} from 'react';

export default function useEvents() {
  const [event, setEvent] = useEffect(null);
  const [name, setName] = useEffect('');

  return [
    {
      event,
      name
    },
    function(name, value) {
      setName(name);
      setValue(value);
    }
  ];
}
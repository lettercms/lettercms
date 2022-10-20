import Card from './asideCard';

export default function MostViewed({mostViewed}) {
  return mostViewed.map(e => <Card key={e._id} {...e} />)
}
import sdk from '@lettercms/sdk';
import Image from 'next/image';

async function deleteCategory(name, categories, cb) {
  try {
    if (!confirm('¿Estás seguro de eliminar esta categoría?'))
      return;

    const {status} = await sdk.blogs.deleteCategory(name);

    if (status === 'OK') {
      categories = categories.filter((e) => e.name !== name);

      cb(categories);
    }
  } catch (err) {
    throw new Error(err);
  }
}

const Categories = ({categories, setCategories}) => <ul id="categories">
  {categories.map(({ name, alias }) => (
    <li key={name}>
      <Image layout='fill' alt='Asset' src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/cross.svg" onClick={() => deleteCategory(name, categories, setCategories)} />
      <span className="alias">{alias}</span>
      <span className="name">{name}</span>
    </li>
  ))}
  <style jsx>{`
    #categories li {
      background: white;
      box-shadow: 1px 1px 3px gray;
      border-radius: 5px;
      margin: 10px 0;
      padding: 10px 0;
      display: flex;
      align-items: center;
    }
    #categories li img {
      width: 15px;
      cursor: pointer;
      margin: 0 5px;
    }
    #categories li .alias {
      width: 40%;
      font-weight: bold;
      font-size: 20px;
    }
    #categories li .name {
      color: gray;
    }
  `}</style>
</ul>;

export default Categories;

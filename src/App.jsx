// start code

import { useGlobalContext } from './context/GlobalContext';
import { useMemo, useState } from 'react';

function App() {
  const { handleSearch, getProducts, searchQuery, settingFinalProds, finalProds } = useGlobalContext();

  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <main>
        <div className="input-box">
          <h1>Cerca prodotti</h1>
          <input
            onChange={(e) => {
              setSearchValue(e.target.value);
              getProducts(e.target.value).then((prods) => {
                settingFinalProds(prods);
              });
            }}
            name="search"
            type="text"
            placeholder="airpods"
          />
        </div>
        <div>
          {console.log('searchValue: ', searchValue)}
          <ul>{finalProds.length > 0 && searchValue.length > 0 && finalProds.map((prod) => <li key={prod.id}>{prod.title}</li>)}</ul>
        </div>
      </main>
    </>
  );
}

export default App;

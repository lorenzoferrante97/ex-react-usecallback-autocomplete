// start code

import { useGlobalContext } from './context/GlobalContext';
import { useMemo, useState } from 'react';
import AutoComplete from './components/AutoComplete';

function App() {
  const { getProducts, settingFinalProds, finalProds } = useGlobalContext();

  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <main id="main">
        <h1>Cerca prodotti</h1>
        <div className="input-box">
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
          {finalProds.length > 0 && searchValue.length > 0 && <AutoComplete prods={finalProds} search={searchValue} />}
        </div>
      </main>
    </>
  );
}

export default App;

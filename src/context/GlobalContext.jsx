import { createContext, useState, useContext, useCallback } from 'react';
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  // debounce
  const debounce = (callback, delay) => {
    let timeout;

    return (value) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback(value), delay);
    };
  };

  // fetch products
  const getProducts = async (searchQuery) => {
    console.log('searchQuery into fetch: ', searchQuery);
    try {
      const fetchProducts = await (await fetch(`https://dummyjson.com/products/search?limit=7&q=${searchQuery}`)).json();

      // console.log('fetchProducts: ', fetchProducts);

      const flteredRes = fetchProducts.products.filter((prod) => prod.title.toLowerCase().includes(searchQuery));

      return flteredRes;
    } catch (error) {
      throw new Error("Can't search products with fetch");
    }
  };

  const callbackDebounce = useCallback(
    debounce((e) => {
      getProducts(e.target.value).then((prods) => {
        settingFinalProds(prods);
      });
    }, 300),
    []
  );

  // set final prods
  const [finalProds, setFinalProds] = useState([]);

  const settingFinalProds = useCallback((prods) => {
    console.log('prods: ', prods);
    setFinalProds(prods);
  }, []);

  const value = { getProducts, settingFinalProds, callbackDebounce, finalProds };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };

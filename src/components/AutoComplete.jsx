export default function AutoComplete({ prods, search }) {
  return (
    <>
      <div className="autocomplete">
        <ul>
          {prods.map((prod) => (
            <li key={prod.id}>{prod.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

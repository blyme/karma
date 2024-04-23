import useGetKarmaPeople from "./hooks/useGetKarmaPeople";

function App() {
  const { data } = useGetKarmaPeople();
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;

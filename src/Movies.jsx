import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Result from "./Components/Result";
import axios from "axios";

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3f9790fdb1497b47dc14d109a284f4b5&page=1";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=3f9790fdb1497b47dc14d109a284f4b5&query=";

// Create a new QueryClient
const queryClient = new QueryClient();

function MovieSearchApp() {
  const [search, setSearch] = useState("");

  const changeTheSearch = (event) => {
    setSearch(event.target.value);
  };

  // Define a query for getting all movies
  const { data: allMovies, isLoading: isLoadingAllMovies } = useQuery(
    "allMovies",
    async () => {
      const response = await axios.get(APIURL);
      return response.data.results;
    }
  );

  // Define a query for searching movies
  const { data: searchedMovies, isLoading: isLoadingSearchedMovies } = useQuery(
    ["searchedMovies", search],
    async () => {
      const response = await axios.get(SEARCHAPI + search);
      return response.data.results;
    },
    {
      enabled: !!search, // only fetch when search is not empty
    }
  );

  return (
    <div className="max-w-[1240px] shadow-xl min-h-[400px] mx-auto p-3">
      <h1 className="text-center font-sans font-bold text-[40px] text-violet-600">Search Movies</h1>
      <input
        type="search"
        value={search}
        onChange={changeTheSearch}
        className="w-full border border-black rounded text-slate-700 p-4"
      />
      {isLoadingAllMovies || isLoadingSearchedMovies ? (
        <div className="text-3xl text-center mt-2"> Loading... </div>
      ) : (
        <Result movies={search === "" ? allMovies : searchedMovies} />
      )}
    </div>
  );
}

// Wrap your component with QueryClientProvider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieSearchApp />
    </QueryClientProvider>
  );
}

export default App;

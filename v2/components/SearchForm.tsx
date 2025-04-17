import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <div>
      <form action="/" className="search-form">
        <input
          type="text"
          placeholder="Search Startup"
          defaultValue={query}
          className="search-input"
          name="query"
        />

        <div className="flex gap-2">
          {query && <SearchFormReset />}
          <button type="submit" className="search-btn text-white">
            <Search className="size-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;

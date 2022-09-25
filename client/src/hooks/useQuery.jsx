import { useDispatch } from "react-redux";
import { queryActions } from "../stores/queryStore//queryReducer";
import { useSearchParams } from "react-router-dom";
const useQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const addQueryOperation = (filter, option) => {
    if (filter === "category" || filter === "brand") {
      return searchParams.append(filter, option.toLowerCase());
    }
    if (filter === "price") {
      const [lower, upper] = option
        .replaceAll("$", "")
        .replaceAll(" ", "")
        .split("-");
      searchParams.set("price[gte]", lower);
      return searchParams.set("price[lte]", upper);
    }
    if (filter === "rating") {
      return searchParams.set("ratingsAverage[gte]", parseInt(option));
    }
    if (filter === "sort") {
      return searchParams.set(
        "sort",
        option.endsWith("High") ? "price" : "-price"
      );
    }
  };

  const deleteQueryOperation = (filter, option) => {
    if (filter === "category" || filter === "brand") {
      let options = searchParams.getAll(filter);
      console.log(options);
      searchParams.delete(filter);
      options = options.filter((opt) => opt !== option.toLowerCase());
      options.forEach((opt) => searchParams.append(filter, opt));
      return;
    }
    if (filter === "price") {
      searchParams.delete("price[gte]");
      return searchParams.delete("price[lte]");
    }
    if (filter === "rating") {
      return searchParams.delete("ratingsAverage[gte]");
    }
    if (filter === "sort") {
      return searchParams.delete("sort");
    }
  };

  const deleteFilterOperation = (filter) => {
    if (filter === "category" || filter === "brand") {
      return searchParams.delete(filter);
    }
    if (filter === "price") {
      searchParams.delete("price[gte]");
      return searchParams.delete("price[lte]");
    }
    if (filter === "rating") {
      return searchParams.delete("ratingsAverage[gte]");
    }
    if (filter === "sort") {
      return searchParams.delete("sort");
    }
  };

  const addOption = (mainFilter, option) => {
    dispatch(queryActions.addToFilters([mainFilter, option]));
    addQueryOperation(mainFilter, option);
    searchParams.delete("page");
    setSearchParams(searchParams.toString());
  };

  const removeOption = (mainFilter, option) => {
    dispatch(queryActions.removeFromFilters([mainFilter, option]));
    deleteQueryOperation(mainFilter, option);
    searchParams.delete("page");
    setSearchParams(searchParams.toString());
  };

  const initialize = (filter) => {
    if (filter === "category" || filter === "brand") {
      let options = searchParams.getAll(filter);
      options.forEach((option) =>
        dispatch(queryActions.addToFilters([filter, option]))
      );
      return;
    }
    if (filter === "price") {
      const lower = searchParams.get("price[gte]");
      const upper = searchParams.get("price[lte]");
      return (
        lower &&
        upper &&
        dispatch(queryActions.addToFilters([filter, `$${lower} - ${upper}`]))
      );
    }
    if (filter === "rating") {
      const option = searchParams.get("ratingsAverage[gte]");
      return (
        option &&
        dispatch(queryActions.addToFilters([filter, `${option} and upwards`]))
      );
    }
    if (filter === "sort") {
      const option = searchParams.get("sort");
      return (
        option &&
        dispatch(
          queryActions.addToFilters([
            filter,
            `${
              option.startsWith("-") ? "Price High to Low" : "Price Low to High"
            }`,
          ])
        )
      );
    }
  };

  const clearFilter = (mainFilter) => {
    dispatch(queryActions.clearFilter(mainFilter));
    deleteFilterOperation(mainFilter);
    searchParams.delete("page");
    setSearchParams(searchParams.toString());
  };

  const clearQuery = () => {
    dispatch(queryActions.clearQuery());
    setSearchParams();
  };

  return {
    addOption,
    removeOption,
    clearFilter,
    clearQuery,
    initialize,
  };
};

export default useQuery;

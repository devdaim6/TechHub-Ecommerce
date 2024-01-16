export const getSortOrder = (sortOrderParam, sortByField) => {
  switch (sortByField) {
    case "price":
      return {
        price:
          sortOrderParam === "priceLowToHigh"
            ? 1
            : sortOrderParam === "priceHighToLow"
            ? -1
            : 1,
      };
    case "featured":
      return { featured: sortOrderParam === "featured" ? -1 : 1 };
    case "newest":
      return { createdAt: sortOrderParam === "newest" ? -1 : 1 };
    default:
      return {};
  }
};

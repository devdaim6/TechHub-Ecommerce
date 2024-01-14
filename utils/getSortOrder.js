export const getSortOrder = async (sortOrderParam, sortByField) => {
  switch (sortOrderParam) {
    case "desc":
      return  -1  // High to Low Price
    case "asc":
      return  1   // Low to High Price
    case "az":
      return   1  
    case "za":
      return -1  
    default:
      return   1 
  }
};

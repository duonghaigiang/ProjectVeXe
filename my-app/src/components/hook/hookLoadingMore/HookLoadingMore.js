import React, { useState } from "react";

function useLoadMore(items, itemsPerPage) {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);

  function loadMore() {
    setVisibleItems(visibleItems + itemsPerPage);
  }

  const canLoadMore = visibleItems < items.length;

  const displayedItems = items.slice(0, visibleItems);

  return [displayedItems, loadMore, canLoadMore];
}
export default useLoadMore;

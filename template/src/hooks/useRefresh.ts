import { useState } from 'react';

export const useRefresh = (refetch: () => Promise<void>) => {
  const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
    try {
      await refetch?.();
    } finally {
      setRefreshing(false);
    }
  }

  return {
    refreshing,
    onRefresh,
  };
};

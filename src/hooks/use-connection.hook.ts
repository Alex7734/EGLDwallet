import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useConnection = (): boolean => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isInternetReachable = state.isInternetReachable;
      if (isInternetReachable !== null) setIsConnected(isInternetReachable);
    });
    return () => unsubscribe();
  }, []);
  return isConnected;
};

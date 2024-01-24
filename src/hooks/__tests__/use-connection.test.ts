import NetInfo from '@react-native-community/netinfo';
import { useConnection } from "@hooks/use-connection.hook";
import { renderHook } from "@testing-library/react";
import { act } from "react-test-renderer";

describe('useConnection', () => {
  it('should respond to network status changes', () => {
    const mockAddEventListener = NetInfo.addEventListener as jest.Mock;
    mockAddEventListener.mockImplementation(callback => {
      callback({ isInternetReachable: true });
      return () => {};
    });

    const { result, rerender } = renderHook(() => useConnection());
    expect(result.current).toBe(true);

    act(() => {
      mockAddEventListener.mockImplementation(callback => {
        callback({ isInternetReachable: false });
      });
      rerender();
    });

    expect(result.current).toBe(false);
  });
});

import { StyleSheet } from "react-native";

export const bottomTabNavigatorStyle = StyleSheet.create({
  bottomTab: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    elevation: 24,
    backgroundColor: '#2d52d0',
    borderRadius: 24,
    height: 54,
    paddingBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});

export const BOTTOM_TAB_NAVIGATOR_ACTIVE_COLOR = '#ffffff';
export const BOTTOM_TAB_NAVIGATOR_INACTIVE_COLOR = '#999999';

import React from 'react';

import {
  Platform,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export type MenuItemProps = {
  children: React.ReactNode;
  itemRender?: any;
  disabled?: boolean;
  disabledTextColor?: string;
  pressColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
} & PressableProps;

export function MenuItem({
  children,
  itemRender,
  disabled = false,
  disabledTextColor = '#bdbdbd',
  onPress,
  pressColor = '#e0e0e0',
  style,
  textStyle,
  ...props
}: MenuItemProps) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => ({
        backgroundColor: Platform.OS !== 'android' && pressed ? pressColor : undefined,
      })}
      android_ripple={{ color: pressColor }}
      onPress={onPress}
      {...props}
    >
      <View style={[styles.container, style]}>
        {
          itemRender ? (
            React.isValidElement(itemRender) ? itemRender : itemRender(disabled, disabledTextColor)
          ) : (
            <Text
              numberOfLines={1}
              style={[styles.title, disabled && { color: disabledTextColor }, textStyle]}
            >
              {children}
            </Text>
          )
        }
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
    maxWidth: 248,
    minWidth: 124,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 16,
    textAlign: 'left',
  },
});

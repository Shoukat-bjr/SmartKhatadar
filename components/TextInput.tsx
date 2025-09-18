import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    KeyboardTypeOptions,
    TextInput as RNTextInput,
    StyleProp,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";
import { Colors } from "../constants/Colors";

export interface InputInterface {
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  onBlur?: any;
  value?: string;
  name?: string;
  keyboardType?: KeyboardTypeOptions;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  width?: string | number;
  autoCorrect?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  numberOfLines?: number;
  multiline?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  borderColor?: string;
  focusedBorderColor?: string;
  placeholderTextColor?: string;
}

const TextInput = ({
  placeholder,
  secureTextEntry = false,
  onChangeText,
  onBlur,
  value,
  keyboardType = "default",
  icon,
  iconSize,
  iconColor,
  width = "100%",
  style,
  autoCapitalize = "sentences",
  autoCorrect = true,
  inputStyle,
  multiline = false,
  numberOfLines = 1,
  borderColor = Colors.gray[200],
  focusedBorderColor = Colors.primary[500], // Use your blue color here
}: InputInterface) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <View
      style={[
        styles.input,
        {
          width: width as number,
          borderColor: isFocused ? focusedBorderColor : borderColor,
          borderWidth: 1,
          backgroundColor: isFocused ? Colors.gray[100] : Colors.gray[100],
        },
        style,
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={iconSize || 18}
          color={isFocused ? focusedBorderColor : iconColor || Colors.gray[400]}
          style={{ marginHorizontal: 5 }}
        />
      )}
      <RNTextInput
        placeholderTextColor={Colors.gray[400]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={value}
        keyboardType={keyboardType}
        style={[inputStyle, { flex: 1, color: Colors.text.primary }]}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
});

export default TextInput;

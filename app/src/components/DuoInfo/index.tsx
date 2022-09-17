import React from "react";
import { ColorValue, Text, View } from "react-native";
import { THEME } from "../../theme";

import { styles } from "./styles";

interface Props {
  label: string;
  value: string;
  color?: ColorValue;
}

export function DuoInfo({ label, value, color = THEME.COLORS.TEXT }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
}

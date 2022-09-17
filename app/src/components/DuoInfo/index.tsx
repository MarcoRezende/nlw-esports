import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

interface Props {
  label: string;
  value: string;
  color?: string;
}

export function DuoInfo({}: Props) {
  return <View style={styles.container}></View>;
}

import React from "react";
import { ImageBackground, View } from "react-native";

import { styles } from "./styles";

import background from "../../assets/background-galaxy.png";

interface Props {
  children: React.ReactNode;
}

export function Background({ children }: Props) {
  return (
    <ImageBackground
      source={background}
      defaultSource={background}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}

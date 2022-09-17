import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import { THEME } from "../../theme";

export interface GameCardProps {
  id: string;
  title: string;
  _count: { ads: number };
  bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

export function GameCard({
  data: {
    bannerUrl,
    title,
    _count: { ads },
  },
  ...rest
}: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground source={{ uri: bannerUrl }} style={styles.cover}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{title}</Text>
          <Text style={styles.ads}>{ads}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

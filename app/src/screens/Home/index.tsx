import React from "react";
import { FlatList, Image, View } from "react-native";

import { styles } from "./styles";
import { GAMES } from "../../utils/games";
import { GameCard } from "../../components/GameCard";

import logo from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={GAMES}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
        horizontal
        renderItem={({ item }) => {
          return <GameCard data={item} />;
        }}
      />
    </View>
  );
}

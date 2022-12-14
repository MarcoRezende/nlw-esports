import React, { useEffect } from "react";
import { FlatList, Image, View } from "react-native";

import { styles } from "./styles";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { useNavigation } from "@react-navigation/native";

import logo from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";

export function Home() {
  const [games, setGames] = React.useState<GameCardProps[]>();

  const { navigate } = useNavigation();

  function handleOpenGame({ id, name, bannerUrl }: GameCardProps) {
    navigate("Game", { id, name, bannerUrl });
  }

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://172.22.42.248:8090/games");
        const data = await response.json();

        setGames(data);
      } catch (error) {
        console.debug(JSON.stringify(error));
      }
    };

    fetchGames();
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          horizontal
          renderItem={({ item }) => {
            return (
              <GameCard
                key={item.id}
                data={item}
                onPress={() => handleOpenGame(item)}
              />
            );
          }}
        />
      </View>
    </Background>
  );
}

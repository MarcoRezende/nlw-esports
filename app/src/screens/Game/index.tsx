import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { Heading } from "../../components/Heading";
import { Entypo } from "@expo/vector-icons";

import { styles } from "./styles";
import { THEME } from "../../theme";

import logo from "../../assets/logo-nlw-esports.png";

export function Game() {
  const [duos, setDuos] = React.useState<DuoCardProps[]>([]);

  const route = useRoute();
  const { bannerUrl, name, id } = route.params as GameParams;

  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `http://172.22.34.234:8090/games/${id}/ads`
        );
        const data = await response.json();
        console.debug(data);

        setDuos(data);
      } catch (error) {
        console.debug(JSON.stringify(error));
      }
    };

    fetchGames();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              size={20}
              color={THEME.COLORS.CAPTION_300}
            />
          </TouchableOpacity>

          <Image source={logo} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: bannerUrl }}
          resizeMode="cover"
          style={styles.cover}
        />

        <Heading title={name} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          contentContainerStyle={styles.contentList}
          style={styles.containerList}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <DuoCard key={item.id} data={item} onConnect={() => {}} />
          )}
          horizontal
        />
      </SafeAreaView>
    </Background>
  );
}

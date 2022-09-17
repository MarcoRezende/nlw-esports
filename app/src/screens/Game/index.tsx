import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";

export function Game() {
  const [duos, setDuos] = React.useState<DuoCardProps[]>([]);

  const route = useRoute();
  const { bannerUrl, title, id } = route.params as GameParams;
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  useEffect(() => {
    fetch(`http://172.22.34.234:8090/games/${id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}></View>

        <Image
          source={{ uri: bannerUrl }}
          resizeMode="cover"
          // style={styles.cover}
        />

        <Heading title={title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
        />
      </SafeAreaView>
    </Background>
  );
}

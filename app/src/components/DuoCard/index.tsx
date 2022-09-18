import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { THEME } from "../../theme";
import { DuoInfo } from "../DuoInfo";
import { GameController } from "phosphor-react-native";

import { styles } from "./styles";

export interface DuoCardProps {
  id: string;
  hourStart: string;
  hourEnd: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({
  data: { name, hourEnd, hourStart, useVoiceChannel, weekDays, yearsPlaying },
  onConnect,
}: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={name} />
      <DuoInfo label="Tempo de jogo" value={`${yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${weekDays.length} dias \u2022 ${hourStart} - ${hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio"
        value={useVoiceChannel ? "Sim" : "Não"}
        color={useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />
      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController size={20} color={THEME.COLORS.TEXT} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}

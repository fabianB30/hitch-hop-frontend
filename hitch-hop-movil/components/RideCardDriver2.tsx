// Creado por Xotchil
// Ediciones: Xotchil
// Contiene el código del componente RideCardDriver que muestra la información de un viaje 
// con solicitudes pendientes para el conductor.
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "expo-image";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { MapPinCheck, MapPin, BringToFront } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { MoveRight, Users } from "lucide-react-native";
import { VStack } from "./ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";

// Define los datos que se reciben
type PendingRequestCardProps = {
  name: string;
  price: string;
  location: string;
  time: string;
};

type RideCardProps = {
  users: PendingRequestCardProps[];
  userLimit: number;
  actualPassengerNumber: number;
  price: string;
  date: string;
  time: string;
  start: string;
  startLabel?: string;
  end: string;
  onCancel: () => void;
  onDetails: (users: PendingRequestCardProps[]) => void;
};

export function RideCardDriver2({
  users,
  userLimit,
  price,
  date,
  time,
  start,
  startLabel = "Punto de Inicio",
  end,
  onCancel,
  onDetails,
}: RideCardProps) {
  return (
    <Box
      style={{
        width: "100%",
        marginBottom: 24,
        backgroundColor: "#ECECFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DDDCDB",
        shadowColor: "#262626",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        padding: 10,
        position: "relative",
      }}
    >
      <HStack
        style={{
          alignItems: "center",
          marginBottom: 24,
          width: "100%",
        }}
      >
        <Box style={{ flex: 1, alignItems: "flex-start", paddingRight: 5}}>
          <Text style={styles.start}>{start}</Text>
        </Box>
        <Box
          style={{
            width: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MoveRight size={24} color="black" />
        </Box>
        <Box style={{ flex: 1, alignItems: "flex-end", paddingLeft: 5 }}>
          <Text style={styles.end}>{end}</Text>
        </Box>
      </HStack>

      <HStack
        style={{
          alignItems: "center", 
          justifyContent: "space-between",
          marginBottom: 10,
          width: "100%",
          marginTop: 0,
        }}
      >
        <VStack
          style={{
            gap: 7,
            justifyContent: "center",
            alignItems: "center",
            minHeight: 50, 
          }}
        >
          <Text style={[styles.mediumFont, {fontSize: 16, lineHeight: 20}]}>{date}</Text>
          <Text style={[styles.mediumFont, {fontSize: 24, lineHeight: 28, textAlignVertical: 'center'}]}>{time}</Text>
        </VStack>
        <VStack
          style={{
            gap: 7,
            justifyContent: "center",
            alignItems: "center",
            minHeight: 50,
          }}
        >
          <Box
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 4,
              marginRight: 10,
              alignSelf: "flex-end",
              maxWidth: 180,
            }}
          >
            <Users size={20} color="black" />
            <Text style={styles.mediumFont2}>
              Solicitudes pendientes: {users.length}
            </Text>
          </Box>
          <Text style={[styles.mediumFont, {fontSize: 24, lineHeight: 28, textAlignVertical: 'center'}]}>{price}</Text>
        </VStack>
      </HStack>
      <HStack
        style={{
          alignItems: "stretch",
          justifyContent: "space-between",
          marginBottom: 10,
          width: "100%",
          marginTop: 10,
        }}
      >
        <Button
          size="md"
          variant="solid"
          action="primary"
          style={{
            backgroundColor: "#F87171",
            width: 115,
            marginTop: 0,
            borderRadius: 8,
            paddingLeft: 14, 
            paddingRight: 14, 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 8
          }}
        >
          <ButtonText 
            style={{ 
              color: "#FEFEFF",
              fontSize: 16, 
              fontFamily: 'Exo-Regular', 
              fontWeight: '500', 
              wordWrap: 'break-word'
            }} 
            onPress={onCancel}
          >
            Cancelar
          </ButtonText>
        </Button>
        <Button
          size="md"
          variant="solid"
          action="primary"
          style={{
            backgroundColor: "#7875F8",
            width: 150,
            marginTop: 0,
            paddingLeft: 14, 
            paddingRight: 14, 
            borderRadius: 8, 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 8
          }}
        >
          <ButtonText 
            style={{ 
              color: "#FEFEFF",
              fontSize: 16, 
              fontFamily: 'Exo-Regular', 
              fontWeight: '500', 
              wordWrap: 'break-word'
            }} 
            onPress={() => onDetails(users)}
          >
            Detalles {">"}
          </ButtonText>
        </Button>
      </HStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  start: {
    fontFamily: "Exo-Regular",
    fontSize: 12,
    fontWeight: "400",
    color: "#171717",
    textAlign: "left",
  },
  end: {
    fontFamily: "Exo-Regular",
    fontSize: 12,
    fontWeight: "400",
    color: "#171717",
    textAlign: "left",
  },
  mediumFont: {
    fontFamily: 'exo.medium',
    fontWeight: "400",
    color: "#171717",
    textAlign: "center",
  },
  regularFont: {
    fontFamily: 'Exo-Regular',
    fontWeight: "400",
    color: "#171717",
    textAlign: "center",
  },
  mediumFont2: {
    fontFamily: 'exo.medium',
    fontSize: 12,
    fontWeight: "400",
    color: "#171717",
    textAlign: "center",
    flexShrink: 1, 
    flexWrap: "wrap",
    maxWidth: 140,
  },
});

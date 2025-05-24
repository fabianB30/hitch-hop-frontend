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

type RideCardProps = {
  users: number;
  userLimit: number;
  price: string;
  date: string;
  time: string;
  start: string;
  startLabel?: string;
  end: string;
  onCancel: () => void;
  onDetails: () => void;
};

export function RideCardDriver({
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
        <Box style={{ flex: 1, alignItems: "flex-start", paddingRight: 5 }}>
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
          alignItems: "stretch",
          justifyContent: "space-between",
          marginBottom: 24,
          width: "100%",
          marginTop: 10,
        }}
      >
        <VStack
          style={{
            gap: 7,
          }}
        >
          <Text style={styles.mediumFont}>{date}</Text>
          <Text style={styles.BigFont}>{time}</Text>
        </VStack>
        <VStack
          style={{
            gap: 7,
          }}
        >
          <Box
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 4,
              marginRight: 10,
              alignSelf: "flex-end", // Add this line to push the box to the right
            }}
          >
            <Users size={24} color="black" />
            <Text style={styles.mediumFont}>
              {users}/{userLimit}
            </Text>
          </Box>
          <Text style={styles.BigFont}>{price}</Text>
        </VStack>
      </HStack>
      <HStack
        style={{
          alignItems: "stretch",
          justifyContent: "space-between",
          marginBottom: 24,
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
            width: 100,
            marginTop: 0,
          }}
        >
          <ButtonText style={{ color: "#FEFEFF" }} onPress={onCancel}>
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
          }}
        >
          <ButtonText style={{ color: "#FEFEFF" }} onPress={onDetails}>
            Detalles {">"}
          </ButtonText>
        </Button>
      </HStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  start: {
    fontFamily: "Exo",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    color: "#171717",
    textAlign: "left",
  },
  end: {
    fontFamily: "Exo",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    color: "#171717",
    textAlign: "right",
  },
  mediumFont: {
    fontFamily: "Exo",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    color: "#171717",
    textAlign: "left",
  },
  BigFont: {
    fontFamily: "Exo",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "500",
    color: "#171717",
    textAlign: "left",
    paddingTop: 5,
  },
});

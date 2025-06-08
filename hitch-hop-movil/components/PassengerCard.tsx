import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "expo-image";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { Phone, MapPin } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "./ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";

type RideCardProps = {
  name: string;
  price: string;
  phone: string;
  location: string;
};

export function PassengerCard({ name, price, phone, location }: RideCardProps) {
  return (
    <Box
      style={{
        justifyContent: "flex-start",
        alignContent: "center",
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
          alignItems: "stretch",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Avatar size="xl">
          <AvatarImage source={require("@/assets/images/image17.png")} />
        </Avatar>
        <VStack
          style={{
            flex: 1,
            marginLeft: 5,
            marginRight: 10,
            width: "100%", // Ensure it takes all available space
            alignItems: "stretch",
            justifyContent: "space-between",
          }}
        >
          <HStack
            style={{
              flex: 1,
              marginLeft: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box style={{ flex: 1 }}>
              <Text style={styles.name}>{name}</Text>
            </Box>
            <Box style={{ flex: 1, alignItems: "flex-end" }}>
              <Text style={styles.price}>{price}</Text>
            </Box>
          </HStack>
          <HStack
            style={{
              flex: 1,
              marginLeft: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "flex-end",
              }}
            >
              <MapPin size={18} color="black" />
              <Text
                style={styles.location}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {location}
              </Text>
            </Box>
            <Box
              style={{
                flexDirection: "row",
                gap: 4,
              }}
            >
              <Phone size={18} color="black" />
              <Text style={styles.phone}>{phone}</Text>
            </Box>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  name: {
    fontFamily: "Exo",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700",
    color: "#171717",
    textAlign: "left",
    paddingTop: 5,
  },
  phone: {
    fontFamily: "Exo",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    color: "#171717",
    textAlign: "right",
  },
  price: {
    fontFamily: "Exo",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500",
    color: "#171717",
    textAlign: "right",
    paddingTop: 5,
  },
  location: {
    fontFamily: "Exo",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    color: "#171717",
    textAlign: "left",
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: 80,
    lineHeight: 14,
  },
});

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { MapPin, Phone } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { VStack } from "./ui/vstack";
import { View } from "react-native";

type RideCardProps = {
  name: string;
  price: string;
  phone: string;
  location: string;
  image: string;
};

export function PassengerCard({
  name,
  price,
  phone,
  location,
  image,
}: RideCardProps) {
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
          <AvatarImage
            source={
              image
                ? { uri: image } // <-- Use base64 if provided
                : require("@/assets/images/image17.png")
            }
          />
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
              <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">{name}</Text>
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
                gap: 5,
                marginRight: 0,
              }}
            >
              <Text style={styles.price}>{price}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "flex-end" }}>
                <Phone size={18} style={{marginRight: 4}} color="black" />
                <Text style={styles.phone}>{phone}</Text>
              </View>
            </Box>
          </HStack>
          <HStack
            style={{
              flex: 1,
              marginLeft: 10,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            >
              <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "flex-start",
                marginTop: 5,
              }}
              >
                <MapPin size={18} color="black" style={{ marginRight: 4 }} />
                  <Text
                    style={styles.location}
                    ellipsizeMode="tail"
                    numberOfLines={5}
                  >
                    {location}
                  </Text>
              </Box>
            </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  name: {
    fontFamily: "Exo-Bold",
    fontSize: 18,
    fontWeight: "700",
    color: "#171717",
    textAlign: "left",
    paddingTop: 5,
  },
  phone: {
    fontFamily: "exo.medium",
    fontSize: 17,
    fontWeight: "500",
    color: "#171717",
    paddingTop: 5,
    textAlign: "right",
  },
  price: {
    fontFamily: "exo.medium",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500",
    color: "#171717",
    textAlign: "left",
    paddingTop: 5,
    paddingRight: 15,
  },
  location: {
    fontFamily: "Exo-Regular",
    fontSize: 14,
    fontWeight: "400",
    color: "#171717",
    textAlign: "left",
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: "100%",
    lineHeight: 18,
    alignSelf: "center",
    width: "100%",
  },
});

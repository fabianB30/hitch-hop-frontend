import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Clock, Ellipsis, MapPin, Users } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { VStack } from "./ui/vstack";

type RideCardProps = {
  id: number;
  name: string;
  price: string;
  location: string;
  time: string;
  capacity: string;
  image?: string; // base64
  onAccept?: () => void; // <-- Add
  onReject?: () => void; // <-- Add
};

export function PendingRequestCard({
  name,
  price,
  location,
  time,
  capacity,
  image,
  onAccept,
  onReject,
}: RideCardProps) {
  const isFull = Number(capacity) <= 0;
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
        flexGrow: 1,
        flexShrink: 1,
        gap: 20,
      }}
    >
      <HStack
        style={{
          alignItems: "stretch",
          alignContent: "stretch",
          justifyContent: "flex-start",
          width: "100%",
          flexGrow: 1,
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
            width: "100%",
            alignItems: "stretch",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Text style={styles.name}>{name}</Text>
          </Box>
          <Box
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start", // changed from "center"
              alignContent: "flex-end",
              flexShrink: 1,
              flexWrap: "nowrap",
              marginTop: 4, // add a little space from the name
              maxWidth: "100%",
            }}
          >
            <MapPin size={18} color="black" />
            <Text
              style={[
                styles.location,
                { maxWidth: 140, marginLeft: 4, flexShrink: 1, flexGrow: 1 },
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {location}
            </Text>
          </Box>
          <Box
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start", // changed from "center"
              alignContent: "flex-end",
              flexShrink: 1,
              flexWrap: "nowrap",
              marginTop: 4, // add a little space from the name
              maxWidth: "100%",
            }}
          >
            <Clock size={18} color="black" />
            <Text
              style={[
                styles.location,
                { maxWidth: 140, marginLeft: 4, flexShrink: 1, flexGrow: 1 },
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {time}
            </Text>
          </Box>
          <HStack
            style={{
              flex: 1,
              marginTop: 4,
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            <Text
              style={[
                styles.price,
                {
                  maxWidth: 140,
                  marginLeft: 4,
                  lineHeight: 22, // Should be >= fontSize (18)
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {price}
            </Text>
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start", // changed from "center"
                alignContent: "flex-end",
                flexShrink: 1,
                flexWrap: "nowrap",
                marginTop: 4, // add a little space from the name
                maxWidth: "100%",
              }}
            >
              <Users size={18} color="black" />
              <Text
                style={[
                  styles.location,
                  { maxWidth: 140, marginLeft: 4, flexShrink: 1, flexGrow: 1 },
                ]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {capacity}
              </Text>
            </Box>
          </HStack>
        </VStack>
        <Pressable>
          <Box
            style={{
              backgroundColor: "#7875F8",
              borderRadius: 5,
              padding: 4,
              alignSelf: "flex-start", // Only take up as much space as needed
              justifyContent: "center",
              alignItems: "center",
              minHeight: undefined, // Remove any inherited height
              minWidth: undefined,
            }}
          >
            <Ellipsis size={18} color="white" />
          </Box>
        </Pressable>
      </HStack>
      <HStack
        style={{
          alignItems: "stretch",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 10,
          paddingHorizontal: 20,
        }}
      >
        <Button
          size="md"
          variant="solid"
          action="primary"
          style={{
            backgroundColor: "#F87171",
            marginTop: 0,
          }}
          onPress={onReject} // <-- Call reject handler
        >
          <ButtonText
            style={{
              color: "#FEFEFF",
              fontWeight: "500",
              fontSize: 20,
              wordWrap: "break-word",
            }}
          >
            Rechazar
          </ButtonText>
        </Button>
        <Button
          size="md"
          variant="solid"
          action="primary"
          style={{
            backgroundColor: "#7875F8",
            marginTop: 0,
            opacity: isFull ? 0.5 : 1,
          }}
          onPress={!isFull ? onAccept : undefined} // <-- Call accept handler if not full
          disabled={isFull}
        >
          <ButtonText
            style={{
              color: "#FEFEFF",
              fontWeight: "500",
              fontSize: 20,
              wordWrap: "break-word",
            }}
          >
            Aceptar
          </ButtonText>
        </Button>
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
  time: {
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
    // No paddingTop
  },
  location: {
    fontFamily: "Exo",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    color: "#171717",
    textAlign: "left",
    flexShrink: 1,
    flexWrap: "wrap",
    lineHeight: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

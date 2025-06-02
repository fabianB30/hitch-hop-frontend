import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "expo-image";
import { ImageSourcePropType, Text } from "react-native";
import { MapPinCheck, MapPin } from "lucide-react-native";

type RideCardProps = {
  avatar: ImageSourcePropType;
  name: string;
  car: string;
  price: string;
  date: string;
  time: string;
  start: string;
  startLabel?: string;
  end: string;
  onCancel: () => void;
  onDetails: () => void;
};

export function RideCard({
  avatar,
  name,
  car,
  price,
  date,
  time,
  start,
  startLabel = 'Punto de Inicio',
  end,
  onCancel,
  onDetails,
}: RideCardProps) {
  return (
    <Box
      style={{
        width: '100%',
        minHeight: 230,
        marginBottom: 24,
        backgroundColor: '#ECECFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DDDCDB',
        shadowColor: '#262626',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        padding: 16,
        position: 'relative',
      }}
    >
      {/* Avatar */}
      <Image
        source={avatar}
        style={{
          width: 68,
          height: 68,
          position: 'absolute',
          left: 10,
          top: 10,
          borderRadius: 34,
        }}
      />
      {/* Name */}
      <Text
        style={{
          position: 'absolute',
          left: 82,
          top: 10,
          color: '#171717',
          fontSize: 24,
          fontFamily: 'Exo',
          fontWeight: '700',
          letterSpacing: 0.2,
        }}
      >
        {name}
      </Text>
      {/* Car */}
      <Text
        style={{
          position: 'absolute',
          left: 82,
          top: 42,
          color: '#171717',
          fontSize: 14,
          fontFamily: 'Exo',
          fontWeight: '300',
        }}
      >
        {car}
      </Text>
      {/* Price */}
      <Text
        style={{
          position: 'absolute',
          left: 82,
          top: 87,
          color: '#171717',
          fontSize: 18,
          fontFamily: 'Exo',
          fontWeight: '500',
        }}
      >
        {price}
      </Text>
      {/* Date */}
      <Box style={{ position: 'absolute', left: 185, top: 89, flexDirection: 'row', alignItems: 'center', width: 117 }}>
        <Image
          source={require('@/assets/icons/clock.svg')}
          style={{ width: 14, height: 14, marginRight: 4 }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 12,
            fontFamily: 'Exo',
            fontWeight: '500',
            flex: 1,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {date}
        </Text>
      </Box>
      {/* Time */}
      <Text
        style={{
          position: 'absolute',
          left: 223,
          top: 105,
          textAlign: 'right',
          color: 'black',
          fontSize: 12,
          fontFamily: 'Exo',
          fontWeight: '500',
        }}
      >
        {time}
      </Text>
      {/* Start Icon & Text */}
      <Box style={{ position: 'absolute', left: 27, top: 132, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}>
        <MapPinCheck size={16} color="black" strokeWidth={3} style={{ marginRight: 4 }} />
      </Box>
      <Text
        style={{
          position: 'absolute',
          left: 49,
          top: 134,
          color: '#262627',
          fontSize: 12,
          fontFamily: 'Exo',
          fontWeight: '400',
        }}
      >
        {startLabel}: {start}
      </Text>
      {/* End Icon & Text */}
      <Box style={{ position: 'absolute', left: 27, top: 155, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}>
        <MapPin size={16} color="black" strokeWidth={3} style={{ marginRight: 4 }} />
      </Box>
      <Text
        style={{
          position: 'absolute',
          left: 51,
          top: 157,
          color: '#262627',
          fontSize: 12,
          fontFamily: 'Exo',
          fontWeight: '400',
        }}
      >
        Destino: {end}
      </Text>
      <Box
        style={{
            position: 'absolute',
            left: 30,
            right: 30,
            top: 191,
            flexDirection: 'row',
            gap: 20,
        }}
        >
        <Pressable
            style={{
            width: 100,
            height: 30,
            backgroundColor: '#F87171',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            }}
            onPress={onCancel}
        >
            <Text
            style={{
                color: '#FEFEFF',
                fontSize: 20,
                fontFamily: 'Exo',
                fontWeight: '500',
            }}
            >
            Cancelar
            </Text>
        </Pressable>
        <Pressable
            style={{
            flex: 1,
            height: 30,
            backgroundColor: '#7875F8',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 8,
            }}
            onPress={onDetails}
        >
            <Text
            style={{
                color: '#FEFEFF',
                fontSize: 20,
                fontFamily: 'Exo',
                fontWeight: '500',
            }}
            >
            Detalles
            </Text>
            <Image
            source={require('@/assets/icons/rightChevron.svg')}
            style={{ width: 16, height: 16, marginRight: 4 }}
            />
        </Pressable>
        </Box>
    </Box>
  );
}
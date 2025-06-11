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
      }}
    >
      {/* Avatar y datos principales */}
      <Box style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
        <Image
          source={avatar}
          style={{
            width: 68,
            height: 68,
            borderRadius: 34,
            marginRight: 12,
          }}
        />
        <Box style={{ flex: 1 }}>
          <Text style={{
            color: '#171717',
            fontSize: 24,
            fontFamily: 'Exo',
            fontWeight: '700',
            letterSpacing: 0.2,
          }}>
            {name}
          </Text>
          <Text style={{
            color: '#171717',
            fontSize: 14,
            fontFamily: 'Exo',
            fontWeight: '300',
            marginTop: 2,
          }}>
            {car}
          </Text>
          <Box
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 8,
              marginTop: 4,
            }}
          >
            {/* Precio */}
            <Text
              style={{
                color: '#171717',
                fontSize: 18,
                fontFamily: 'Exo',
                fontWeight: '500',
                marginTop: 2,
                flex: 1,
              }}
            >
              {price}
            </Text>
            {/* Fecha y hora */}
            <Box style={{ alignItems: 'flex-start', flex: 1, justifyContent: 'center'}}>
              <Box style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                <Image
                  source={require('@/assets/icons/clock.svg')}
                  style={{ width: 14, height: 14, marginRight: 4 }}
                />
                <Text style={{
                  color: 'black',
                  fontSize: 12,
                  fontFamily: 'Exo',
                  fontWeight: '500',
                  textAlign: 'left',
                  flexShrink: 1,
                }}>
                  {date}
                </Text>
              </Box>
              <Text style={{
                color: 'black',
                fontSize: 16,
                fontFamily: 'Exo',
                fontWeight: '500',
                marginTop: 2,
                textAlign: 'center',
                width: '100%',
              }}>
                {time}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Paradas y destino */}
      <Box style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 8 }}>
        <MapPinCheck size={16} color="black" strokeWidth={3} style={{ marginRight: 4, marginTop: 2 }} />
        <Text style={{
          color: '#262627',
          fontSize: 12,
          fontFamily: 'Exo',
          fontWeight: '400',
          flexShrink: 1,
          flexWrap: 'wrap',
          flex: 1,
        }}>
          {startLabel}: {start}
        </Text>
      </Box>
      <Box style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 4 }}>
        <MapPin size={16} color="black" strokeWidth={3} style={{ marginRight: 4, marginTop: 2 }} />
        <Text style={{
          color: '#262627',
          fontSize: 12,
          fontFamily: 'Exo',
          fontWeight: '400',
          flexShrink: 1,
          flexWrap: 'wrap',
          flex: 1,
        }}>
          Destino: {end}
        </Text>
      </Box>

      {/* Botones */}
      <Box
        style={{
          flexDirection: 'row',
          gap: 20,
          marginTop: 16,
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
              fontSize: 16,
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
              fontSize: 16,
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
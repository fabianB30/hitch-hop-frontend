import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu rol</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#9D9BF9' }]}
        onPress={() => router.push('./HomePasajero')}
      >
        <Text style={styles.buttonText}>Pasajero</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FFCD65' }]}
        onPress={() => router.push('./HomeConductor')}
      >
        <Text style={styles.buttonText}>Conductor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 40,
    fontFamily: 'Exo',
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Exo',
    fontWeight: '500',
    color: '#fff',
  },
});

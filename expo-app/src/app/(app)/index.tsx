import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import { useAuth } from '@/src/providers/AuthProvider';
import { Button } from 'react-native';
import { Redirect } from 'expo-router';
export default function TabOneScreen() {

  const { logout } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255, 255, 255, 0.1)" />
      < EditScreenInfo path="app/(app)/index.tsx" />
      <Button title="Log Out" onPress={logout} />

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

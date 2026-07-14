import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="alta"
        options={{
          title: "Alta",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-add" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="consulta"
        options={{
          title: "Consulta",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          )
        }}
      />
    </Tabs>
  );
}

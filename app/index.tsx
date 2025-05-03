import { ImageBackground, ScrollView, Text, View, StyleSheet } from "react-native";
import * as SQLite from 'expo-sqlite';


import PaginaSelecion from "./pages/PaginaSelecion";
 import listaDeAnimalesVendidos from "./pages/listaDeAnimalesVendidos";
export default function Index() {
  return (
    <ScrollView
      style={{
        flex: 0,
        
      }}
    >
      <PaginaSelecion />


    </ScrollView>
  );

 
}

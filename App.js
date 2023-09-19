import React, { useState } from "react";
import { StyleSheet, View, Text, Button, SafeAreaView, ActivityIndicator } from "react-native";
import { Keyboard } from 'react-native';
import axios from "axios";

export default ApiContainer = () => {
  const [loading, setLoading] = useState(false)
  const [natal, setNatal] = useState(null)
  const [fromAxios, setFromAxios] = useState(false)

  const setFeriados = (json) => {
    setNatal(json[11].date);
    setFromAxios(true);
  }

  const getFeriados = () => {
    setFromAxios(false);
    axios.get(`https://brasilapi.com.br/api/feriados/v1/2024`)
      .then(response => {
        console.log(response.data);
        setTimeout(() => {
          setFeriados(response.data);
          Keyboard.dismiss();
        }, 2000);
        setFromAxios(true);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={{ top: 30 }}>
      <View style={{ margin: 18 }}>
        <Button
          title={'Feriados!'}
          onPress={() => { getFeriados() }}
          color='green'
        />
      </View>

      {fromAxios ?
        <View>
          <Text style={{ margin: 18 }}>Natal:{natal}</Text>
        </View>
        :
        <Text style={{ margin: 18 }}></Text>
      }
      {loading &&
        <View>
          <Text style={{ fontSize: 16, color: 'red', margin: 18 }}>Carregando...</Text>
          <ActivityIndicator size="large" color="red" />
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
  },
});
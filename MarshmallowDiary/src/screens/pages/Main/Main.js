import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Footer from '../../components/component/Footer';
import Calendar from './Calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../../../api/http'

const Main = ({ navigation }) => {
  var today = new Date();

  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var dateString = year + '-' + month + '-' + day;

  const [words, setWords] = useState()

  AsyncStorage.getItem('token', (err, result) => {
    const token = result;
    console.log('token', token)
  })

  AsyncStorage.getItem('refresh', (err, result) => {
    const refresh = result;
    console.log('refresh', refresh)
  })

  useEffect(() => {
    http.get('/analysis/loyalty')
      .then(res => {
        Object.entries(res.data).map(([k, v]) => {
          setWords(v)
        })
      })
      .catch(err => {
        navigation.navigate('LoginCheck')
      })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF9F8' }}>
      <View style={{ flex: 1 }}>
        <Calendar />
      </View>
      <View style={{ flex: 0.3, backgroundColor: 'rgba(217,217,217,0.3)', borderRadius: 20, marginLeft: '20%', marginRight: '20%' }}>
        <View style={{ fontSize: 15, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text>{words}</Text>
        </View>
      </View>
      <View style={{ flex: 0.1 }}>
        <Button title='Home' onPress={() => navigation.navigate('Home')} />
      </View>
      <Footer />
    </View>
  )
};

export default Main;
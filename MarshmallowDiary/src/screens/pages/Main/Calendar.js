import React, { useEffect, useState } from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import { format, addMonths, subMonths, getMonth } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
import { isSameMonth, isSameDay, addDays, parse} from 'date-fns'
import { Icon } from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mm_positive from '../../../assets/images/mm/mm_positive.png'
import mm_neutral from '../../../assets/images/mm/mm_neutral.png'
import mm_negative from '../../../assets/images/mm/mm_negative.png'
import { http } from '../../../api/http'


const Calendar = ({navigation}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const week = ['일', '월', '화', '수', '목', '금', '토']

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const rows = []
  let days = []
  let day = startDate
  let formattedDate = ''

  while( day <= endDate ) {
    for (let i=0; i<7; i++) {
      formattedDate = format(day, 'd')
      const cloneDay = day
      days.push(formattedDate)
      day = addDays(day, 1)
    }

    rows.push(days)
    // console.log('rows', rows)

    days = []
  }
  for (let x=0; x<7; x++) {
    if (rows[0][x] > 10) {
      rows[0][x] = 100
    }
  }
  for (let y=0; y<7; y++) {
    if (rows[4][y] < 10) {
      rows[4][y] = 0
    }
  }
  if (rows[5]) {
    for (let z=0; z<7; z++) {
      if (rows[5][z] < 10) {
        rows[5][z] = 0
      }
    }
  }

  const targetYear = format(currentMonth, 'yyyy')
  const targetMonth = format(currentMonth, 'MM')
  // console.log(targetYear+'-'+targetMonth)

  var today = new Date();

  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day2 = ('0' + today.getDate()).slice(-2);

  var dateString = year + '-' + month + '-' + day2;
  

  const [selectedDate, setSelectedDate] = useState(day2)

  const clickedDate = () => {
    console.log(targetYear+'-'+targetMonth+'-'+selectedDate)
  }

  const [monthData, setMonthData] = useState()

  const getMonthData = () => {
    // AsyncStorage.getItem('token', (err, result) => {
    //   const token = result;
    //   // console.log(token)

    //   axios.get(`http://k7a303.p.ssafy.io:9090/api/v1/diary?month=${targetMonth}&year=${targetYear}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    //   .then(res => {
    //     // console.log(res.data.list)
    //     setMonthData(res.data.list)
    //   })
    // })
    http.get(`diary?month=${targetMonth}&year=${targetYear}`)
    .then(res => {
      setMonthData(res.data.list)
    })
  }

  // console.log(monthData)
  const emotions = []

  if (rows[5]) {
    for (let i=0; i<42; i++) {
      emotions.push(0)
    }
  }
  else {
    for (let i=0; i<35; i++) {
      emotions.push(0)
    }
  }
  
  if (monthData) {
    for (let i=0; i<monthData.length; i++) {
      for (let j=0; j<rows.length; j++) {
        for (let k=0; k<rows[j].length; k++) {
          if (monthData[i].day == targetYear+'-'+targetMonth+'-'+('0'+rows[j][k]).slice(-2)) {
            emotions[7*j+k] = monthData[i].emotion
          }
        }
      }
    }
  }
  
  // console.log(rows)
  // console.log(emotions)

  useEffect(() => {
    clickedDate()
  }, [selectedDate])

  useEffect(() => {
    getMonthData()
  }, [targetMonth])

  // const movePage = () => {
  //   for (let i=0; i<emotions.length; i++) {
  //     if (emotions[i] == 0) {
  //       navigation.navigate('Register', { targetDate:clickedDate })
  //     }
  //     else {
  //       navigation.navigate('Detail', { targetDate: clickedDate })
  //     }
  //   }
  // }


  return (
    <View style={{ flex:1 , backgroundColor:'#FFF9F8'}}>
      <View style={{ flexDirection:'row', flex: 0.2, justifyContent:'center', alignItems:'center', marginTop:'10%'}}>
        <TouchableOpacity style={{ flex: 0.2 }} onPress={prevMonth}>
          <Icon name="left" type='antdesign' size={20} color="#000000" />
        </TouchableOpacity>
        <View style={{ flex: 0.6, justifyContent:'center', alignItems:'center' }}>
          <Text style={{ fontSize:25, fontWeight:'bold' }}>
            {format(currentMonth, 'yyyy')}년 {format(currentMonth, 'M')}월
          </Text>
        </View>
        <TouchableOpacity style={{ flex: 0.2 }} onPress={nextMonth}>
          <Icon name="right" type='antdesign' size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection:'row', flex: 0.1, marginTop:'5%'}}>
        {week.map((data, i) => (
          <View style={{ flex: 0.14, justifyContent:'center', alignItems:'center' }} key={i}>
            <Text style={{fontSize:20}}>{data}</Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection:'row', marginTop:'3%' }}>
        {rows[0].map((data, i) => (
          <TouchableOpacity key={i} style={{flex: 0.14, justifyContent:'center', alignItems:'center' }} onPress={() => {setSelectedDate(('0' + data).slice(-2)); clickedDate();}}>
            {dateString == targetYear+'-'+targetMonth+'-'+('0' + data).slice(-2) ?
            <View style={{backgroundColor:'#D9D9D9', borderRadius:30}}>
              <Text>  {data}  </Text>
            </View>
            : (data < 20) ?
            <Text>
              {data}
            </Text> : null}
          </TouchableOpacity> 
        ))}
      </View>

      <View style={{ flexDirection:'row', flex:0.1 }}>
        {emotions.slice(0,7).map((data, i) => (
          <View key={i} style={{ flex:0.14, justifyContent:'center', alignItems:'center' }} >
            {data == 0 ? null : 
              (data == 'positive') ? 
              <Image source={mm_positive} style={{ width:15, height:15 }} />
              :
              (data == 'neutral') ?
              <Image source={mm_neutral} style={{ width:15, height:15 }} />
              :
              <Image source={mm_negative} style={{ width:15, height:15 }} />
            }
          </View>
        ))}
      </View>

      <View style={{ flexDirection:'row' }}>
        {rows[1].map((data, i) => (
          <TouchableOpacity key={i} style={{flex: 0.14, justifyContent:'center', alignItems:'center' }} onPress={() => {setSelectedDate(('0' + data).slice(-2)); clickedDate();}}>
            {dateString == targetYear+'-'+targetMonth+'-'+('0' + data).slice(-2) ?
            <View style={{backgroundColor:'#D9D9D9', borderRadius:30}}>
              <Text>  {data}  </Text>
            </View>
            : 
            <Text>
              {data}
            </Text>}
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection:'row', flex:0.1}}>
        {emotions.slice(7,14).map((data, i) => (
          <View key={i} style={{ flex:0.14, justifyContent:'center', alignItems:'center' }} >
            {data == 0 ? null : 
              (data == 'positive') ? 
              <Image source={mm_positive} style={{ width:15, height:15 }} />
              :
              (data == 'neutral') ?
              <Image source={mm_neutral} style={{ width:15, height:15 }} />
              :
              <Image source={mm_negative} style={{ width:15, height:15 }} />
            }
          </View>
        ))}
      </View>

      <View style={{ flexDirection:'row' }}>
        {rows[2].map((data, i) => (
          <TouchableOpacity key={i} style={{flex: 0.14, justifyContent:'center', alignItems:'center' }} onPress={() => {setSelectedDate(('0' + data).slice(-2)); clickedDate();}}>
            {dateString == targetYear+'-'+targetMonth+'-'+('0' + data).slice(-2) ?
            <View style={{backgroundColor:'#D9D9D9', borderRadius:30}}>
              <Text>  {data}  </Text>
            </View>
            : 
            <Text>
              {data}
            </Text>}
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection:'row', flex:0.1 }}>
        {emotions.slice(14,21).map((data, i) => (
          <View key={i} style={{ flex:0.14, justifyContent:'center', alignItems:'center' }} >
            {data == 0 ? null : 
              (data == 'positive') ? 
              <Image source={mm_positive} style={{ width:15, height:15 }} />
              :
              (data == 'neutral') ?
              <Image source={mm_neutral} style={{ width:15, height:15 }} />
              :
              <Image source={mm_negative} style={{ width:15, height:15 }} />
            }
          </View>
        ))}
      </View>

      <View style={{ flexDirection:'row' }}>
        {rows[3].map((data, i) => (
          <TouchableOpacity key={i} style={{flex: 0.14, justifyContent:'center', alignItems:'center' }} onPress={() => {setSelectedDate(('0' + data).slice(-2)); clickedDate();}}>
            {dateString == targetYear+'-'+targetMonth+'-'+('0' + data).slice(-2) ?
            <View style={{backgroundColor:'#D9D9D9', borderRadius:30}}>
              <Text>  {data}  </Text>
            </View>
            : 
            <Text>
              {data}
            </Text>}
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection:'row', flex:0.1 }}>
        {emotions.slice(21,28).map((data, i) => (
          <View key={i} style={{ flex:0.14, justifyContent:'center', alignItems:'center' }} >
            {data == 0 ? null : 
              (data == 'positive') ? 
              <Image source={mm_positive} style={{ width:15, height:15 }} />
              :
              (data == 'neutral') ?
              <Image source={mm_neutral} style={{ width:15, height:15 }} />
              :
              <Image source={mm_negative} style={{ width:15, height:15 }} />
            }
          </View>
        ))}
      </View>

      <View style={{ flexDirection:'row' }}>
        {rows[4].map((data, i) => (
          <TouchableOpacity key={i} style={{flex: 0.14, justifyContent:'center', alignItems:'center' }} onPress={() => {setSelectedDate(('0' + data).slice(-2)); clickedDate();}}>
            {dateString == targetYear+'-'+targetMonth+'-'+('0' + data).slice(-2) ?
            <View style={{backgroundColor:'#D9D9D9', borderRadius:30}}>
              <Text>  {data}  </Text>
            </View>
            : (data > 20) ?
            <Text>
              {data}
            </Text>: null}
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection:'row', flex:0.1 }}>
        {emotions.slice(28,35).map((data, i) => (
          <View key={i} style={{ flex:0.14, justifyContent:'center', alignItems:'center' }} >
            {data == 0 ? null : 
              (data == 'positive') ? 
              <Image source={mm_positive} style={{ width:15, height:15 }} />
              :
              (data == 'neutral') ?
              <Image source={mm_neutral} style={{ width:15, height:15 }} />
              :
              <Image source={mm_negative} style={{ width:15, height:15 }} />
            }
          </View>
        ))}
      </View>

      {rows[5] ?
        <View style={{ flexDirection:'row' }}>
          {rows[5].map((data, i) => (
            <TouchableOpacity key={i} style={{flex: 0.14, justifyContent:'center', alignItems:'center' }} onPress={() => {setSelectedDate(('0' + data).slice(-2)); clickedDate();}}>
              {dateString == targetYear+'-'+targetMonth+'-'+('0' + data).slice(-2) ?
            <View style={{backgroundColor:'#D9D9D9', borderRadius:30}}>
              <Text>  {data}  </Text>
            </View>
            : (data >20) ?
            <Text>
              {data}
            </Text>: null}
            </TouchableOpacity>
          ))}
        </View> : null}

      {rows[5] ?
        <View style={{ flexDirection:'row', flex:0.1 }}>
          {emotions.slice(35,42).map((data, i) => (
            <View key={i} style={{ flex:0.14, justifyContent:'center', alignItems:'center' }} >
              {data == 0 ? null : 
                (data == 'positive') ? 
                <Image source={mm_positive} style={{ width:15, height:15 }} />
                :
                (data == 'neutral') ?
                <Image source={mm_neutral} style={{ width:15, height:15 }} />
                :
                <Image source={mm_negative} style={{ width:15, height:15 }} />
              }
            </View>
          ))}
        </View> : null}


      
    </View>
  )
}

export default Calendar
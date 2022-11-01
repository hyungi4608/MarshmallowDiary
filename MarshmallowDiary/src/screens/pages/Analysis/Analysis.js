import React, { useState } from 'react';
import { Text, View, Image, Modal, Button, Pressable } from 'react-native';
import Footer from '../../components/component/Footer';
import ChipYellow from '../../components/component/ChipYellow';
import { Icon } from '@rneui/themed'; 
import { Chip } from "@react-native-material/core";
import PieChart from 'react-native-pie-chart';
import mm_positive from '../../../assets/images/mm/mm_positive.png'
import mm_neutral from '../../../assets/images/mm/mm_neutral.png'
import mm_negative from '../../../assets/images/mm/mm_negative.png'
import { TouchableOpacity } from 'react-native-gesture-handler';



const Analysis = () => {
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth()+1)).slice(-2); 

    const [targetYear, setTargetYear] = useState(year)
    const [targetMonth, setTargetMonth] = useState(month)


    const [isAll, setIsAll] = useState(false)
    const selectAll = () => {
      setIsAll(true)
    }

    const selectMonth = () => {
      setIsAll(false)
    }
    
    const [visible, setVisible] = useState(false)
    const openModal = () => {
      setVisible(true)
    }
    const closeModal = () => {
      setVisible(false)
    }

    const [visible2, setVisible2] = useState(false)
    const openModal2 = () => {
      setVisible2(true)
    }
    const closeModal2 = () => {
      setVisible2(false)
    }

    const [visible3, setVisible3] = useState(false)
    const openModal3 = () => {
      setVisible3(true)
    }

    const closeModal3 = () => {
      setVisible3(false)
    }

    const widthAndHeight = 225
    const series = [60, 25, 15] // axios로 받아와서 각각 7로 나눔 + 데이터 없으면 에러 뜨니 차트 말고 데이터 없음 띄워줘야함
    const sliceColor = ['#91C788','#FBC687','#F38181']

    return (
        <View style={{ backgroundColor:'#FFF9F8', flex: 1}}>
          <View style={{ alignItems:'center', justifyContent:'center', marginTop:'15%' }} >
            <Text style={{ fontSize:25, fontWeight:'bold' }}>김싸피님의 감정 분석 레포트</Text>
          </View>

          <View style={{flex: 1.2, flexDirection:'row' }}>
            <View style={{ marginLeft:'7.5%', justifyContent:'center'}} >
              <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
              />
            </View>
            <View style={{ marginTop:'5%', alignItems:'center', flex: 1, marginRight:'3%' }}>
              { isAll == true ? 
              <Chip style={{ backgroundColor:'#FFEBA5' }} onPress={openModal}><Text>전체</Text></Chip> : 
              <Chip style={{ backgroundColor:'#FFEBA5' }} onPress={openModal}><Text>{targetYear}년 {targetMonth}월</Text></Chip>
              } 
              
              <Modal visible={visible} setVisible={setVisible} transparent={true} animationType={'fade'}>
                <Pressable style={{ flex:1 , justifyContent:'center', alignItems:'center'}} onPress={closeModal}>
                  <View style={{ flex:0.3, backgroundColor:'white', justifyContent:'center', alignItems:'center', width:'80%', borderRadius:30 }}>
                    <Chip style={{ backgroundColor:'#FFEBA5', width:75, alignItems:'center'}} onPress={() => {selectMonth(); closeModal(); openModal2();}}><Text>월별</Text></Chip>

                    <View style={{ height:15 }}/>
                    <Chip style={{ backgroundColor:'#FFEBA5', width:75, alignItems:'center'}} onPress={() => {selectAll(); closeModal();}}><Text>전체</Text></Chip>
                  </View>
                </Pressable>
              </Modal>

              <Modal visible={visible2} setVisible={setVisible2} transparent={true} animationType={'fade'}>
                <Pressable style={{ flex:1 , justifyContent:'center', alignItems:'center'}} onPress={closeModal2}>
                  <View style={{ flex:0.5, backgroundColor:'white', justifyContent:'center', alignItems:'center', width:'90%', borderRadius:30}}>
                    <View style={{flex:0.0625 }}/>
                    <View style={{flex:0.25, flexDirection:'row' }}>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal2(); openModal3(); setTargetYear(year-6);}}>
                        <Text style={{ fontWeight:'bold' }}>{year-6}년</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal2(); openModal3(); setTargetYear(year-5);}}>
                        <Text style={{ fontWeight:'bold' }}>{year-5}년</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal2(); openModal3(); setTargetYear(year-4);}}>
                        <Text style={{ fontWeight:'bold' }}>{year-4}년</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2,backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal2(); openModal3(); setTargetYear(year-3);}}>
                        <Text style={{ fontWeight:'bold' }}>{year-3}년</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                    </View>
                    <View style={{flex:0.0625 }}/>
                    <View style={{flex:0.25, flexDirection:'row' }}>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal2(); openModal3(); setTargetYear(year-2);}}>
                        <Text style={{ fontWeight:'bold' }}>{year-2}년</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal2(); openModal3(); setTargetYear(year-1);}}>
                        <Text style={{ fontWeight:'bold' }}>{year-1}년</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal2(); openModal3(); setTargetYear(year);}}>
                        <Text style={{ fontWeight:'bold' }}>{year}년</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal2(); openModal3(); setTargetYear(year+1);}}>
                        <Text style={{ fontWeight:'bold' }}>{year+1}년</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                    </View>
                    <View style={{flex:0.0625 }}/>
                    <View style={{flex:0.25, flexDirection:'row' }}>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal2(); openModal3(); setTargetYear(year+2);}}>
                        <Text style={{ fontWeight:'bold' }}>{year+2}년</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal2(); openModal3(); setTargetYear(year+3);}}>
                        <Text style={{ fontWeight:'bold' }}>{year+3}년</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal2(); openModal3(); setTargetYear(year+4);}}>
                        <Text style={{ fontWeight:'bold' }}>{year+4}년</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal2(); openModal3(); setTargetYear(year+5);}}>
                        <Text style={{ fontWeight:'bold' }}>{year+5}년</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                    </View>
                    <View style={{flex:0.0625 }}/>
                  </View>
                </Pressable>
              </Modal> 

              <Modal visible={visible3} setVisible={setVisible3} transparent={true} animationType={'fade'} >
                <Pressable style={{ flex:1 , justifyContent:'center', alignItems:'center'}} onPress={closeModal3}>
                  <View style={{ flex:0.5, backgroundColor:'white', justifyContent:'center', alignItems:'center', width:'90%', borderRadius:30 }}>
                    <View style={{flex:0.0625 }}/>
                    <View style={{flex:0.25, flexDirection:'row' }}>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal3(); setTargetMonth(1);}}>
                        <Text style={{ fontWeight:'bold' }}>1월</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal3(); setTargetMonth(2);}}>
                        <Text style={{ fontWeight:'bold' }}>2월</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal3(); setTargetMonth(3);}}>
                        <Text style={{ fontWeight:'bold' }}>3월</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2,backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal3(); setTargetMonth(4);}}>
                        <Text style={{ fontWeight:'bold' }}>4월</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                    </View>
                    <View style={{flex:0.0625 }}/>
                    <View style={{flex:0.25, flexDirection:'row' }}>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal3(); setTargetMonth(5);}}>
                        <Text style={{ fontWeight:'bold' }}>5월</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal3(); setTargetMonth(6);}}>
                        <Text style={{ fontWeight:'bold' }}>6월</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal3(); setTargetMonth(7);}}>
                        <Text style={{ fontWeight:'bold' }}>7월</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal3(); setTargetMonth(8);}}>
                        <Text style={{ fontWeight:'bold' }}>8월</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                    </View>
                    <View style={{flex:0.0625 }}/>
                    <View style={{flex:0.25, flexDirection:'row' }}>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal3(); setTargetMonth(9);}}>
                        <Text style={{ fontWeight:'bold' }}>9월</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal3(); setTargetMonth(10);}}>
                        <Text style={{ fontWeight:'bold' }}>10월</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal3(); setTargetMonth(11);}}>
                        <Text style={{ fontWeight:'bold' }}>11월</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                      <Pressable style={{flex:0.2, backgroundColor:'#FFEBA5', justifyContent:'center', alignItems:'center', borderRadius:30}} onPress={() => {closeModal3(); setTargetMonth(12);}}>
                        <Text style={{ fontWeight:'bold' }}>12월</Text>
                      </Pressable>
                      <View style={{flex:0.04}}/>
                    </View>
                    <View style={{flex:0.0625 }}/>
                  </View>
                </Pressable>
              </Modal>


              
              <View style={{ flexDirection:'row', marginTop:'25%' }}>
                <Image source={mm_positive} style={{ width:23, height:23 }} />
                <Text style={{fontSize:15, marginLeft:'3%'}}>긍정 {series[0]}%</Text>
              </View>
              <View style={{ flexDirection:'row', marginTop:'15%' }}>
                <Image source={mm_neutral} style={{ width:23, height:23 }} />
                <Text style={{fontSize:15, marginLeft:'3%'}}>중립 {series[1]}%</Text>
              </View>
              <View style={{ flexDirection:'row', marginTop:'15%' }}>
                <Image source={mm_negative} style={{ width:23, height:23 }} />
                <Text style={{fontSize:15, marginLeft:'3%'}}>부정 {series[2]}%</Text>
              </View>
            </View>
          </View>

          {/* 나중에 ai 응답으로 대체 */}
          <View style={{flex: 0.8, backgroundColor:'rgba(217,217,217,0.3)', borderRadius:20, marginLeft:'5%', marginRight:'5%' }}>
            <View style={{ fontSize:15, marginTop:'5%', marginLeft:'5%'}}>
              <Text>오늘은 즐거운 하루셨군요!</Text>
              <Text>내일도 즐거운 하루 되시기 바랍니다~</Text>
            </View>
          </View>

          <View style={{ flex: 0.3, alignItems:'center', justifyContent:'center' }}>
            <Chip style={{ alignItems:'center', justifyContent:'center', backgroundColor:'#FFEBA5', width:'30%' }}>
              <Icon name='share' type='fontisto' />
              <Text style={{ fontSize:17 }}>  공유하기 </Text>
            </Chip>
          </View>
          <Footer />
        </View>
    )
};

export default Analysis;
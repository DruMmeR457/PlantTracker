import { StatusBar } from 'expo-status-bar';
import  React, { Component, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Constants from 'expo-constants';

// import Cat from './components/Cat.js';
// import List from './components/ListView.js';
// import GetAll from './api/GetAll.js';

import * as SQLite from 'expo-sqlite';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const db = SQLite.openDatabase('PlantDatabase.db');

// export default function App() {
//   return (
//     <View>
//     <Text><Cat /></Text>
//     <Text><GetAll /></Text>
//     <Text><List /></Text>
//     </View>
//   );
// }

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }

    const HomeScreen = ({ navigation }) => {
      db.transaction(tx => {
           // sending 4 arguments in executeSql
           tx.executeSql('SELECT * FROM Plant', null, // passing sql query and parameters:null
             // success callback which sends two things Transaction object and ResultSet Object
             (txObj, { rows: { _array } }) => this.setState({ data: _array }),
             // failure callback which sends two things Transaction object and Error
             (txObj, error) => console.log('Error ', error)
             ) // end executeSQL
         });
         return(
         <View>
         <Text style={styles.plant}>{'Name'.padEnd(12)}{'Water'.padEnd(12)}{'Fertilize'.padEnd(12)}{'Pot'.padEnd(12)}</Text>
         <ScrollView>
         {
             this.state.data && this.state.data.map(data =>
             (
                 <View key={data.Id} style={styles.container}>
                 <Text style={styles.plant}>{data.Id}  {data.Name.trim().padEnd(12)}{data.LastWatered.trim().padEnd(12)}{data.LastFertilized.trim().padEnd(12)}{data.LastPotted.trim().padEnd(12)}</Text>
                 </View>
             )
         )}
         </ScrollView>
         <Button title="Add Plant" onPress={() => navigation.navigate('HomeScreen')} />
       </View >
      );
    }

    const AddScreen = ({ navigation }) => {
      const [nameText, setNameText] = useState('');
      const [waterText, setWaterText] = useState('');
      const [fertText, setFertText] = useState('');
      const [potText, setPotText] = useState('');
      const [isAdd, setIsAdd] = useState(false);
      db.transaction(tx => {
           // sending 4 arguments in executeSql
           tx.executeSql('SELECT * FROM Plant', null, // passing sql query and parameters:null
             // success callback which sends two things Transaction object and ResultSet Object
             (txObj, { rows: { _array } }) => this.setState({ data: _array }),
             // failure callback which sends two things Transaction object and Error
             (txObj, error) => console.log('Error ', error)
             ) // end executeSQL
         });
         return(
           <View style={{padding: 10}}>
             <TextInput
               style={{height: 40}}
               placeholder="Name"
               onChangeText={nameText => setNameText(nameText)}
               defaultValue={nameText}
             />
             <TextInput
               style={{height: 40}}
               placeholder="Last Watered"
               onChangeText={waterText => setWaterText(waterText)}
               defaultValue={waterText}
             />
             <TextInput
               style={{height: 40}}
               placeholder="Last Fertilized"
               onChangeText={fertText => setFertText(fertText)}
               defaultValue={fertText}
             />
             <TextInput
               style={{height: 40}}
               placeholder="Last Potted"
               onChangeText={potText => setPotText(potText)}
               defaultValue={potText}
             />
             <Button title="Add" disabled={isAdd} onPress={() => {
               Insert(nameText, waterText, fertText, potText);
               setIsAdd(true);
               title='Plant Added!';
             }} />
             <Button title="Go back" onPress={() => navigation.goBack()} />
           </View>
      );
    }

    const Insert = (nameText, waterText, fertText, potText) => {
      db.transaction(tx => {
           tx.executeSql('INSERT INTO Plant (Name, LastWatered, LastFertilized, LastPotted) VALUES (?, ?, ?, ?)', [nameText, waterText, fertText, potText],
             (txObj, resultSet) => this.setState({ data: this.state.data.concat(
                 { Id: resultSet.insertId, Name: nameText, LastWatered: waterText, LastFertilized: fertText, LastPotted: potText }) }),
             (txObj, error) => console.log('Error', error))
         });
    }

    const MyStack = () => {
      return(
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddScreen" component={AddScreen} />
      </Stack.Navigator>
      );
    }

  return (
    <View>
    <Text>Hello, World!</Text>
    <Text>Hello, World!</Text>
    <Text>Hello, World!</Text>
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </View>
    );
  }
}

// function HomeScreen({ navigation }) {
//   db.transaction(tx => {
//        // sending 4 arguments in executeSql
//        tx.executeSql('SELECT * FROM Plant', null, // passing sql query and parameters:null
//          // success callback which sends two things Transaction object and ResultSet Object
//          (txObj, { rows: { _array } }) => this.setState({ data: _array }),
//          // failure callback which sends two things Transaction object and Error
//          (txObj, error) => console.log('Error ', error)
//          ) // end executeSQL
//      });
//      return(
//      <View>
//      <Text style={styles.plant}>{'Name'.padEnd(12)}{'Water'.padEnd(12)}{'Fertilize'.padEnd(12)}{'Pot'.padEnd(12)}</Text>
//      <ScrollView>
//      {
//          this.state.data && this.state.data.map(data =>
//          (
//              <View key={data.Id} style={styles.container}>
//              <Text style={styles.plant}>{data.Id}  {data.Name.trim().padEnd(12)}{data.LastWatered.trim().padEnd(12)}{data.LastFertilized.trim().padEnd(12)}{data.LastPotted.trim().padEnd(12)}</Text>
//              </View>
//          )
//      )}
//      </ScrollView>
//      <Button title="Add Plant" onPress={() => navigation.navigate('HomeScreen')} />
//    </View >
//   );
// }
//
// function AddScreen({ navigation }) {
//   const [nameText, setNameText] = useState('');
//   const [waterText, setWaterText] = useState('');
//   const [fertText, setFertText] = useState('');
//   const [potText, setPotText] = useState('');
//   const [isAdd, setIsAdd] = useState(false);
//      return(
//        <View style={{padding: 10}}>
//          <TextInput
//            style={{height: 40}}
//            placeholder="Name"
//            onChangeText={nameText => setNameText(nameText)}
//            defaultValue={nameText}
//          />
//          <TextInput
//            style={{height: 40}}
//            placeholder="Last Watered"
//            onChangeText={waterText => setWaterText(nameText)}
//            defaultValue={waterText}
//          />
//          <TextInput
//            style={{height: 40}}
//            placeholder="Last Fertilized"
//            onChangeText={fertText => setFertText(nameText)}
//            defaultValue={fertText}
//          />
//          <TextInput
//            style={{height: 40}}
//            placeholder="Last Potted"
//            onChangeText={potText => setPotText(nameText)}
//            defaultValue={potText}
//          />
//          <Button title="Add" disabled={isAdd} onPress={() => {
//            Insert(nameText, waterText, fertText, potText,setData);
//            setIsAdd(true);
//          }} />
//          <Button title="Go back" onPress={() => navigation.goBack()} />
//        </View>
//   );
// }
//
// function Insert(nameText, waterText, fertText, potText)
// {
//   db.transaction(tx => {
//        tx.executeSql('INSERT INTO Plant (Name, LastWatered, LastFertilized, LastPotted) VALUES (?, ?, ?, ?)', [nameText, waterText, fertText, potText],
//          (txObj, resultSet) => this.setState({ data: this.state.data.concat(
//              { Id: resultSet.insertId, Name: nameText, LastWatered: waterText, LastFertilized: fertText, LastPotted: potText }) }),
//          (txObj, error) => console.log('Error', error))
//      });
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plant: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       data: null,
//     }
//
//    // db.transaction(tx => {
//    //   tx.executeSql('INSERT INTO Plant (Name, LastWatered, LastFertilized, LastPotted) VALUES (?, ?, ?, ?)', ['gibberish', '6/14', '5/30', '4/15'],
//    //     (txObj, resultSet) => this.setState({ data: this.state.data.concat(
//    //         { Id: resultSet.insertId, Name: 'gibberish', LastWatered: '6/14', LastFertilized: '5/30', LastPotted: '4/15' }) }),
//    //     (txObj, error) => console.log('Error', error))
//    // })
//
//   }
//   render() {
//     return (
//         <View style={styles.container}>
//         <Text>Hello, World!</Text>
//         <Text>Hello, World!</Text>
//         <Text>Hello, World!</Text>
//         <View>
//           <Button
//             onPress={() => {
//               db.transaction(tx => {
//                    // sending 4 arguments in executeSql
//                    tx.executeSql('CREATE TABLE IF NOT EXISTS Plant(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, LastWatered DATETIME, LastFertilized DATETIME, LastPotted DATETIME);')
//                  }
//                );
//             }}
//             title={'CREATE'}
//           />
//         </View>
//         <View>
//           <Button
//             onPress={() => {
//               if(this.state.data == null)
//               {
//                 db.transaction(tx => {
//                   tx.executeSql('INSERT INTO Plant (Name, LastWatered, LastFertilized, LastPotted) VALUES (?, ?, ?, ?)', ['hello', '1/11', '5/30', '5/25'],
//                     (txObj, resultSet) => this.setState({ data: [].concat(
//                         { Name: 'hello', LastWatered: '1/11', LastFertilized: '5/30', LastPotted: '5/25' }) }),
//                     (txObj, error) => console.log('Error', error))
//                 })
//               }
//               else
//               {
//                 db.transaction(tx => {
//                   tx.executeSql('INSERT INTO Plant (Name, LastWatered, LastFertilized, LastPotted) VALUES (?, ?, ?, ?)', ['hello', '1/11', '5/30', '5/25'],
//                     (txObj, resultSet) => this.setState({ data: this.state.data.concat(
//                         { Name: 'hello', LastWatered: '1/11', LastFertilized: '5/30', LastPotted: '5/25' }) }),
//                     (txObj, error) => console.log('Error', error))
//                 })
//               }
//             }}
//             title={'INSERT'}
//           />
//         </View>
//         <View>
//           <Button
//             onPress={() => {
//               db.transaction(tx => {
//                    // sending 4 arguments in executeSql
//                    tx.executeSql('SELECT * FROM Plant', null, // passing sql query and parameters:null
//                      // success callback which sends two things Transaction object and ResultSet Object
//                      (txObj, { rows: { _array } }) => this.setState({ data: _array }),
//                      // failure callback which sends two things Transaction object and Error
//                      (txObj, error) => console.log('Error ', error)
//                      ) // end executeSQL
//                  });
//             }}
//             title={'SELECT'}
//           />
//         </View>
//         <View>
//         <Button
//           onPress={() => {
//               db.transaction(tx => {
//                 tx.executeSql('DROP TABLE Plant;')
//                 this.setState({ data: null});
//               });
//           }}
//           title={'DROP'}
//         />
//         </View>
//         <Text style={styles.plant}>{'Name'.padEnd(12)}{'Water'.padEnd(12)}{'Fertilize'.padEnd(12)}{'Pot'.padEnd(12)}</Text>
//         <ScrollView>
//         {
//             this.state.data && this.state.data.map(data =>
//             (
//                 <View key={data.Id} style={styles.container}>
//                 <Text style={styles.plant}>{data.Id}  {data.Name.trim().padEnd(12)}{data.LastWatered.trim().padEnd(12)}{data.LastFertilized.trim().padEnd(12)}{data.LastPotted.trim().padEnd(12)}</Text>
//                 </View>
//             )
//         )}
//         </ScrollView>
//       </View >
//     )
//   }
// }
// export default App;

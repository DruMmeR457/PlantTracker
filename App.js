import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

// import Cat from './components/Cat.js';
// import List from './components/ListView.js';
// import GetAll from './api/GetAll.js';

import * as SQLite from 'expo-sqlite';
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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      HeadTable: ['Head1', 'Head2', 'Head3', 'Head4', 'Head5'],
     DataTable: [
       ['Id', 'Name', 'Water', 'Fertilize', 'Pot'],
     ]
    }

   // db.transaction(tx => {
   //   tx.executeSql('INSERT INTO Plant (Name, LastWatered, LastFertilized, LastPotted) VALUES (?, ?, ?, ?)', ['gibberish', '6/14', '5/30', '4/15'],
   //     (txObj, resultSet) => this.setState({ data: this.state.data.concat(
   //         { Id: resultSet.insertId, Name: 'gibberish', LastWatered: '6/14', LastFertilized: '5/30', LastPotted: '4/15' }) }),
   //     (txObj, error) => console.log('Error', error))
   // })

  }
  render() {
    return (
        <View style={styles.container}>
        <Text>Hello, World!</Text>
        <Text>Hello, World!</Text>
        <Text>Hello, World!</Text>
        <View>
          <Button
            onPress={() => {
              db.transaction(tx => {
                   // sending 4 arguments in executeSql
                   tx.executeSql('CREATE TABLE IF NOT EXISTS Plant(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, LastWatered DATETIME, LastFertilized DATETIME, LastPotted DATETIME);')
                 }
               );
            }}
            title={'CREATE'}
          />
        </View>
        <View>
          <Button
            onPress={() => {
                db.transaction(tx => {
                  tx.executeSql('INSERT INTO Plant (Name, LastWatered, LastFertilized, LastPotted) VALUES (?, ?, ?, ?)', ['hello', '1/11', '5/30', '5/25'],
                    (txObj, resultSet) => this.setState({ data: this.state.data.concat(
                        { Name: 'hello', LastWatered: '1/11', LastFertilized: '5/30', LastPotted: '5/25' }) }),
                    (txObj, error) => console.log('Error', error))
                })
            }}
            title={'INSERT'}
          />
        </View>
        <View>
          <Button
            onPress={() => {
              db.transaction(tx => {
                   // sending 4 arguments in executeSql
                   tx.executeSql('SELECT * FROM Plant', null, // passing sql query and parameters:null
                     // success callback which sends two things Transaction object and ResultSet Object
                     (txObj, { rows: { _array } }) => this.setState({ data: _array }),
                     // failure callback which sends two things Transaction object and Error
                     (txObj, error) => console.log('Error ', error)
                     ) // end executeSQL
                 })
            }}
            title={'SELECT'}
          />
        </View>
        <View>
        <Button
          onPress={() => {
              db.transaction(tx => {
                tx.executeSql('DROP TABLE Plant;')
                this.setState({ data: null});
              });
          }}
          title={'DROP'}
        />
        </View>
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
      </View >
    )
  }
}
export default App;

GetAllPlants = () => {
db.transaction(tx => {
     // sending 4 arguments in executeSql
     tx.executeSql('SELECT * FROM Plant', null, // passing sql query and parameters:null
       // success callback which sends two things Transaction object and ResultSet Object
       (txObj, { rows: { _array } }) => this.setState({ data: _array }),
       // failure callback which sends two things Transaction object and Error
       (txObj, error) => console.log('Error ', error)
       ) // end executeSQL
   })
 }

 // CreatePlant = () => {
 //   db.transaction(tx => {
 //     tx.executeSql('INSERT INTO Plant (Name, LastWatered, LastFertilized, LastPotted) VALUES (?, ?, ?, ?)', ['hello', '6/14', '5/30', '4/15'],
 //       (txObj, resultSet) => this.setState({ data: this.state.data.concat(
 //           { Id: resultSet.insertId, Name: 'hello', LastWatered: '6/14', LastFertilized: '5/30', LastPotted: '4/15' }) }),
 //       (txObj, error) => console.log('Error', error))
 //   })
 //  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plant: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

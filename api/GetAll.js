import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import SQLite2 from 'react-native-sqlite-storage';

var db = SQLite.openDatabase('PlantDatabase.db');
var _array = [];

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  plant: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

const GetAll = () => {
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

     const Results = () => {
       GetAll();
       return (
         <View style={styles.container}>
           <FlatList
             data={[
               {key: _array[0]},
               {key: _array[1]},
               {key: 'Dominic'},
               {key: 'Jackson'},
               {key: 'James'},
               {key: 'Joel'},
               {key: 'John'},
               {key: 'Jillian'},
               {key: 'Jimmy'},
               {key: 'Julie'},
             ]}
             renderItem={({plant}) => <Text style={styles.plant}>{plant.key}</Text>}
           />
         </View>
       );
     }
     export default Results;

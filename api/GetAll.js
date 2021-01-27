import React from 'react';
import * as SQLite from 'expo-sqlite';
import * as SQLite2 from 'react-native-sqlite-storage';

var db = SQLite.openDatabase('PlantDatabase.db');

export default GetAll = () => {
  db.transaction(tx => {
       // sending 4 arguments in executeSql
       tx.executeSql('SELECT * FROM items', null, // passing sql query and parameters:null
         // success callback which sends two things Transaction object and ResultSet Object
         (txObj, { rows: { _array } }) => this.setState({ data: _array }),
         // failure callback which sends two things Transaction object and Error
         (txObj, error) => console.log('Error ', error)
         ) // end executeSQL
     })
     return 0;
}

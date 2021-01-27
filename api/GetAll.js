import React from 'react';
import * as SQLite from 'expo-sqlite';

export default function GetAll () {
  var db = SQLite.openDatabase('PlantDatabase.db');
  db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Plant;`,
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }

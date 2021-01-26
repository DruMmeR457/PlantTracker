import React from 'react';
import SQLite from 'react-native-sqlite-storage';
export default class SQLiteScreen extends React.Component {
  constructor() {
    super();
    SQLite.DEBUG = true;
  }
  /**
  * Execute sql queries
  *
  * @param sql
  * @param params
  *
  * @returns {resolve} results
  */
  ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(sql, params, (trans, results) => {
        resolve(results);
      },
        (error) => {
          reject(error);
        });
    });
  });
 /**
   * Select Query Example
   */
  async SelectQuery(){
    let selectQuery = await this.ExecuteQuery("SELECT * FROM Plant", []);
    var rows = selectQuery.rows;
    for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        console.log(item);
    }
  }
}

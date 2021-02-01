import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('PlantDatabase.db');
const Stack = createStackNavigator();

export default Home = () => {
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
   </View >
 )

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
}

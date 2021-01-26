import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import * as SQLite from 'expo-sqlite';

const Cat = (props) => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? "Open Database" : "Opening..."}
      />
    </View>
  );
}

function openDb()
{
  var db = SQLite.openDatabase("Test.db");
  return db;
}

function getAll()
{

}

export default Cat;

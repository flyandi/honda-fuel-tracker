/*
  Fuel Tracker Android App 
  for Honda Infotainment System
  Written by FLYANDI. Released under MIT license.
  https://github.com/flyandi/honda-fuel-tracker

  NOT AFFILIATE WITH HONDA. USE ON YOUR OWN RISK.
*/
import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import RadialGradient from 'react-native-radial-gradient';
import { SafeAreaView, Text, View, ScrollView, Image } from 'react-native';
import { SettingsItem, Button, NavButton, ShadowBox, HeaderLabel, StatisticItem, StatisticDivider, Odometer, HistoryItem } from "./ui";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeBox from 'react-native-swipebox';
import Package from "../package.json";


const SceneAdd = ({ data, onAdd }) => {
  const [newData, setNewData] = useState(data);

  const set = (target, position, value, length, pad = "0") => {
    const v = String(newData[target] || "").padStart(length, pad).split("");
    v[length - position - 1] = value;
    setNewData({ ...newData, [target]: v.join("") });
  }

  const get = (source, position, length, pad = "0") => {
    const v = (newData[source] || "").padStart(length, pad).split("");
    const value = parseInt(v[length - position - 1]) || 0;
    return parseInt(value);
  }

  const handleAdd = () => {
    onAdd && onAdd({ ...newData, stamp: Math.floor(new Date().getTime() / 1000) });
  }

  const genSwipeBoxProps = {
    borderRadius: 0,
    borderColor: "rgba(60, 60, 60, 1)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  }

  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}>
      <ShadowBox padded>
        <StatisticItem
          title="Price per Gallon"
          prefix="$"
          tag="Adjust if applicable"
        >
          <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, }}>
            <SwipeBox
              width={65}
              height={150}
              style={{
                ...genSwipeBoxProps,
                borderRadius: 10,
              }}
              tiles={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              selectedIndex={get("ppg", 2, 3)}
              onChange={(index, value) => set("ppg", 2, value, 3)}
            />
            <Text style={{ color: "#fff", fontSize: 80 }}>.</Text>
            <SwipeBox
              width={65}
              height={150}
              style={{
                ...genSwipeBoxProps,
                borderRadius: 0,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderRightWidth: 2,
              }}
              tiles={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              selectedIndex={get("ppg", 1, 3)}
              onChange={(index, value) => set("ppg", 1, value, 3)}
            />
            <SwipeBox
              width={65}
              height={150}
              style={{
                ...genSwipeBoxProps,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
              tiles={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              selectedIndex={get("ppg", 0, 3)}
              onChange={(index, value) => set("ppg", 0, value, 3)}
            />
          </View>
        </StatisticItem>
        <StatisticDivider />
        <StatisticItem
          title="Gallons Added"
          value="0"
          tag="Round to nearest"
        >
          <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, }}>
            <SwipeBox
              width={65}
              height={150}
              style={{
                ...genSwipeBoxProps,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderRightWidth: 2,

              }}
              tiles={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              selectedIndex={get("gallon", 1, 2)}
              onChange={(index, value) => set("gallon", 1, value, 2)}
            />
            <SwipeBox
              width={65}
              height={150}
              style={{
                ...genSwipeBoxProps,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
              tiles={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              selectedIndex={get("gallon", 0, 2)}
              onChange={(index, value) => set("gallon", 0, value, 2)}
            />
          </View>
        </StatisticItem>
        <StatisticDivider />
        <StatisticItem
          title="Odometer"
          tag="Current Reading"
        >
          <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, }}>
            {String(data.odometer || "000000").padStart(6, "0").substring(0, 6).split("").map((value, index) =>
              <SwipeBox
                key={index}
                width={65}
                height={150}
                style={{
                  ...genSwipeBoxProps,
                  borderTopRightRadius: index == 5 ? 10 : 0,
                  borderBottomRightRadius: index == 5 ? 10 : 0,
                  borderTopLeftRadius: index == 0 ? 10 : 0,
                  borderBottomLeftRadius: index == 0 ? 10 : 0,
                  borderRightWidth: index < 5 ? 2 : 0,
                }}
                tiles={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                selectedIndex={get("odometer", 5 - index, 6)}
                onChange={(x, value) => set("odometer", 5 - index, value, 6)}
              />
            )}
          </View>
        </StatisticItem>

      </ShadowBox>
      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <Button onPress={handleAdd}>
          Add Fuel
        </Button>
      </View>
    </View >
  )
}

const SceneStatistic = ({ list }) => {

  const odometer = parseInt((list[0] || { odometer: 0 }).odometer);
  let totalMiles = odometer - ((list.length > 1 ? parseInt(list[list.length - 1].odometer) : 0));;
  let totalGallons = 0;
  let totalCost = 0;
  let averagePrice = 0;
  list.forEach(item => {
    const ppg = parseInt(item.ppg) / 100;
    totalCost += parseInt(item.gallon) * ppg;
    totalGallons += parseInt(item.gallon);
    averagePrice += ppg;
  });

  averagePrice = averagePrice / list.length;

  let driveMiles = 0;
  let driveGallons = 0;
  let drivePPG = 0;
  let driveCost = 0;
  if (list[0] && list[1]) {
    driveMiles = parseInt(list[0].odometer) - parseInt(list[1].odometer);
    drivePPG = parseInt(list[0].ppg) / 100;
    driveGallons = parseInt(list[0].gallon);
    driveCost = driveGallons * drivePPG;
  }

  const statistics = [
    [
      {
        title: "MPG",
        value: (driveMiles / driveGallons).toFixed(2),
        tag: "Since last fillup",
        color: "#00bbff"
      },
      {
        title: "MPG",
        value: (totalMiles / totalGallons).toFixed(2),
        tag: "All Time",
        color: "#00bbff"
      },
      {
        title: "Cost per Mile",
        prefix: "$",
        value: (driveMiles / driveCost).toFixed(2),
        tag: "Since last fillup",
      },
      {
        title: "Price per Gallon",
        prefix: "$",
        value: drivePPG.toFixed(2),
        tag: "Since last fillup",
      }
    ],
    [
      {
        title: "Total Cost",
        value: (totalCost).toFixed(2),
        tag: "All Time",
        color: "#55FF55"
      },
      {
        title: "Cost per Mile",
        prefix: "$",
        value: (totalMiles / totalCost).toFixed(2),
        tag: "Recorded Miles",
      },
      {
        title: "Total Gallons",
        value: (totalGallons).toFixed(),
        tag: "Total Fueled",
      },
      {
        title: "Price per Gallon",
        prefix: "$",
        value: averagePrice.toFixed(2),
        tag: "Average Total Fueled",
      }
    ]
  ]

  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}>
      {statistics.map((inner, key) => (
        <ShadowBox key={key} padded next style={{ alignSelf: "center" }}>
          {inner.map((item, index) =>
            <View key={index} style={{ flexDirection: "row" }}>
              {index > 0 ? <StatisticDivider /> : null}
              <StatisticItem {...item} />
            </View>
          )}
        </ShadowBox>
      ))}
      <Text style={{ color: "#555", fontSize: 22, marginTop: 20 }}>
        Statistics based on {totalMiles} recorded miles driven and current odometer of {odometer} miles.
      </Text>
    </View>
  )
}

const SceneHistory = ({ list }) => {
  const ll = [...list];
  return (
    <ScrollView>
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <HeaderLabel>
          History
        </HeaderLabel>
        {ll.map((item, key) =>
          <HistoryItem key={key} item={item} previous={ll[key + 1]} />
        )}
      </View>
    </ScrollView>
  )
}

const SceneSettings = ({ onReset }) => {
  const ts = { color: "#ccc", fontSize: 25, textAlign: "center" };
  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}>
      <SettingsItem
        label="This will remove all fuel recordings"
        button="Reset Fuel Recordings"
        onPress={onReset}
      />
      <View style={{ alignItems: "center", marginTop: 40, paddingTop: 40, borderTopWidth: 1, borderColor: "#ccc" }}>
        <Image source={require("./icon.png")} style={{ width: 65, height: 60 }} />
        <Text style={[ts, { fontSize: 35, color: "#fff" }]}>Fuel Tracker</Text>
        <Text style={ts}>Version {Package.version}</Text>
        <Text style={ts}>Built with ♥ by FLYANDI</Text>
        <Text style={ts}>Use at your own risk. This app is not affiliate with Honda.</Text>
        <Text style={ts}>https://github.com/flyandi/honda-fuel-tracker</Text>
      </View>
    </View >
  )
}

const App: () => Node = () => {
  const [booted, setBooted] = useState(false);
  const [scene, setScene] = useState(0);
  const handleScene = scene => setScene(scene);
  const [data, setData] = useState(false);
  const sortList = l => l.sort((a, b) => parseInt(a.odometer) < parseInt(b.odometer) ? 1 : -1);
  const [list, setList] = useState([]);

  const store = d => {
    AsyncStorage.setItem('@list', JSON.stringify(d));
    return d;
  }

  const handleAdd = item => {
    if (parseInt(item.gallon) > 0) {
      setData(item);
      setList(store(sortList([...list, item])));
      handleScene(2);
    }
  }

  const handleReset = () => {
    setList(store([]));
    setData(false);
  }

  useEffect(() => {
    AsyncStorage.getItem('@list').then(d => {
      if (d) {
        try {
          const dd = JSON.parse(d);
          if (dd.length) {
            console.log(dd);
            setList(sortList([...dd]));
            setData(list[0]);
          }
        } catch (e) { }
      }
      setBooted(true);
    }).catch(e => {
      setBooted(true);
    });
  }, []);

  if (!booted) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RadialGradient style={{ flex: 1, flexDirection: "row", }}
        colors={['#1a1a1a', '#000']}
        stops={[0, .40]}
        center={[640, 500]}
        radius={2000}>
        <View style={{
          width: 200,
          flex: 0,
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <NavButton onPress={() => handleScene(1)}>Add Fuel</NavButton>
          <NavButton onPress={() => handleScene(0)}>Statistic</NavButton>
          <NavButton onPress={() => handleScene(2)}>History</NavButton>
          <NavButton onPress={() => handleScene(3)}>Settings</NavButton>
        </View>
        {scene == 0 ? <SceneStatistic list={list} /> : null}
        {scene == 1 ? <SceneAdd data={data} onAdd={handleAdd} /> : null}
        {scene == 2 ? <SceneHistory list={list} /> : null}
        {scene == 3 ? <SceneSettings onReset={handleReset} /> : null}
      </RadialGradient>
    </SafeAreaView>
  );
};

export default App;

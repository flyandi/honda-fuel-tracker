/*
  Fuel Tracker Android App 
  for Honda Infotainment System
  Written by FLYANDI. Released under MIT license.
  https://github.com/flyandi/honda-fuel-tracker

  NOT AFFILIATE WITH HONDA. USE ON YOUR OWN RISK.
*/
import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Fragment,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const styles = StyleSheet.create({
    text: {
        color: "#FFFFFF",
        fontSize: 32,
    },
    headerLabel: {
        color: "#FFFFFF",
        fontSize: 42,
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 2,
    },
    textNav: {
        fontSize: 35,
        color: "#F1F1F1",
        padding: 10,
        paddingLeft: 20,
        textTransform: "uppercase",
    },
    shadowBox: {
        borderRadius: 10,
        padding: 0,
        flexDirection: "row",
        shadowColor: '#171717',
        elevation: 10,
    },
    button: {
        borderRadius: 5,
        padding: 0,
        flex: 0,
        width: "auto",
        shadowColor: '#171717',
        elevation: 5,
        padding: 10,
        borderWidth: 2,
        borderColor: "#444",
        margin: 5,
        flex: 0,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 35,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 2,
        textTransform: "uppercase",
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
    statisticItem: {
        padding: 0,
        flex: 0,
        alignItems: "center",
    },
    statisticDivider: {
        width: 3,
        backgroundColor: "rgba(200, 200, 200, 0.3)",
        borderRadius: 3,
        marginLeft: 20,
        marginRight: 20,
    },
    statisticTextHeader: {
        color: "#CCC",
        fontSize: 30,
    },
    statisticPrefix: {
        marginTop: 10,
        paddingRight: 5,
        color: "#ccc",
        fontSize: 25,
    },
    statisticPrefixSmall: {
        marginTop: 10,
        paddingRight: 5,
        color: "#ccc",
        fontSize: 20,
    },
    statisticValue: {
        color: "#FFF",
        fontSize: 70,
        paddingTop: 10,
        paddingBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 2,
    },
    statisticTag: {
        color: "#ccc",
        fontSize: 20,
        textTransform: "uppercase",
    },
    odometer: {
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
    },
    odometerText: {
        color: "#FFF",
        fontSize: 60,
        textShadowColor: 'rgba(255, 255, 255, 0.2)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 2,
    },
    odometerTextSmall: {
        color: "#FFF",
        fontSize: 30,
        textShadowColor: 'rgba(255, 255, 255, 0.2)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 2,
    },
    odometerTag: {
        color: "#CCC",
        fontSize: 13,
        paddingBottom: 5,
        textTransform: "uppercase",
    },
    historyItemView: {

    },
    historyItemHead: {
        marginRight: 30,
        alignItems: "center",
    },
    historyItemViewDate: {
        fontSize: 20,
        color: "#AAA",
    },
    historyItemOdometer: {
        color: "#FFF",
        fontSize: 60,
        textShadowColor: 'rgba(255, 255, 255, 0.2)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 2,
    },
    historyItemDataValue: {
        width: 130,
        color: "#FFF",
        fontSize: 35,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 2,
        alignItems: "center",
        textAlign: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        paddingTop: 15,
    },
    settingsItem: {
        flexDirection: "column",
        alignItems: "center",
    },
    settingsItemLabel: {
        color: "#FFF",
        fontSize: 30,
        marginBottom: 15,
    },

});

export const HeaderLabel = ({ children }) => {
    return (
        <Text style={styles.headerLabel}>
            {children}
        </Text>
    )
}

export const NavButton = ({ onPress, children }) => {
    return (
        <TouchableOpacity
            onPress={onPress}>
            <Text style={styles.textNav}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

export const ShadowBox = ({ children, dark, next, padded, style = {} }) => {
    return (
        <LinearGradient style={[
            styles.shadowBox,
            dark ? styles.shadowBoxDark : {},
            {
                marginTop: next ? 20 : 0,
                padding: padded ? 20 : 5
            },
            style,
        ]} colors={dark ? ['#111', '#050505'] : ['#333', '#555']}>
            <View style={{flexDirection: "row"}}>
                {children}
            </View>
        </LinearGradient>
    )
}

export const StatisticItem = ({ title, value, prefix, tag, color, children }) => {

    if(isNaN(value)) {
        value = 0;
    }

    return (
        <View style={styles.statisticItem}>
            <Text style={styles.statisticTextHeader}>
                {title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {prefix ? <Text style={styles.statisticPrefix}>{prefix}</Text> : null}
                {children || (
                    <Text style={[styles.statisticValue, color ? { color } : {}]}>{value || "n/a"}</Text>
                )}
            </View>
            <Text style={styles.statisticTag}>
                {tag}
            </Text>
        </View>
    )
}

export const StatisticDivider = ({ }) => <View style={styles.statisticDivider} />;


export const Odometer = ({ value, small = false }) => {
    return (
        <ShadowBox dark next>
            <View style={styles.odometer}>
                <Text style={[styles.odometerText, small ? styles.odometerTextSmall : false]}>
                    {String(value).padStart(6, "0")}
                </Text>
                {small ? null : (
                    <Text style={styles.odometerTag}>
                        Last Recorded Odometer
                    </Text>
                )}
            </View>
        </ShadowBox>
    )
}


export const Button = ({ onPress, children }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient style={styles.button} colors={['#333', '#222']}>
                <Text style={styles.buttonText}>
                    {children}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export const HistoryItem = ({ item, previous }) => {

    const dt = new Date(item.stamp * 1000);
    const ppg = parseInt(item.ppg) / 100;

    let c_miles = 0;
    let c_mpg = 0;
    if (previous) {
        c_miles = parseInt(item.odometer) - parseInt(previous.odometer);
        if (c_miles < 0) c_miles = 0;
        c_mpg = c_miles / parseInt(item.gallon);
    }

    return (
        <ShadowBox padded>
            <View style={styles.historyItemHead}>
                <ShadowBox dark style={{ marginTop: 15 }}>
                    <Text style={styles.odometerTextSmall}>
                        {String(parseInt(item.odometer)).padStart(6, "0")}
                    </Text>
                </ShadowBox>
                <Text style={styles.historyItemViewDate}>
                    {`${dt.getMonth()}/${dt.getDay()}/${dt.getFullYear()}`}
                </Text>
            </View>
            <StatisticDivider />
            <Text style={styles.historyItemDataValue}>
                {parseInt(item.gallon)}
                <Text style={styles.statisticPrefixSmall}>gl</Text>
            </Text>
            <StatisticDivider />
            <Text style={styles.historyItemDataValue}>
                <Text style={styles.statisticPrefixSmall}>$</Text>
                {ppg.toFixed(2)}
                <Text style={styles.statisticPrefixSmall}>/gl</Text>
            </Text>
            <StatisticDivider />
            <Text style={styles.historyItemDataValue}>
                <Text style={styles.statisticPrefixSmall}>$</Text>
                {(ppg * parseInt(item.gallon)).toFixed(2)}
            </Text>
            <StatisticDivider />
            <View>
                <Text style={[styles.historyItemDataValue, { paddingTop: 0, color: c_miles ? "#00BFFF" : "#aaa" }]}>
                    {!c_miles ? "n/a" : (
                        <>
                            <Text style={styles.statisticPrefixSmall}>+</Text>
                            {c_miles}
                            <Text style={styles.statisticPrefixSmall}>mi</Text>
                        </>
                    )}
                </Text>
                <Text style={[styles.historyItemDataValue, { paddingTop: 0, color: c_mpg ? "#00BFFF" : "#aaa" }]}>
                    {!c_mpg ? "n/a" : (
                        <>
                            {c_mpg.toFixed(1)}
                            <Text style={styles.statisticPrefixSmall}>mpg</Text>
                        </>
                    )}
                </Text>
            </View>
        </ShadowBox>
    )
}

export const SettingsItem = ({label, button, onPress}) => {
    return (
        <View style={styles.settingsItem}>
            <Text style={styles.settingsItemLabel}>
                {label}
            </Text>
            {!button ? null : (
                <Button onPress={onPress}>
                    {button}
                </Button>
            )}
        </View>
    )
}
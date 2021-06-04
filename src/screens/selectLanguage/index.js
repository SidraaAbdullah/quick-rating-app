import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
// import Language from '../../li8n/Language'

const SelectLanguage = ({ }) => {
    const [newLang, setNewLang] = useState('')
    // console.log(newLang);

    const changeToEnglish = (newLang) => {
        setNewLang('en')
    }
    const changeToFrench = (newLang) => {
        setNewLang('fr')
    }
    return <View style={styles.container}>
        <Text style={{fontSize:22}}>Change your language</Text>
        <TouchableOpacity style={styles.btnSelection} onPress={changeToEnglish}>
            <Text style={{color:"#fff"}}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSelection} onPress={changeToFrench}>
            <Text style={{color:"#fff"}}>French</Text>
        </TouchableOpacity>
        {/* <Language/> */}
    </View>
}
export default SelectLanguage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bbb",
        justifyContent: "center",
        alignItems: "center"
    },
    btnSelection: {
        width: "80%", paddingVertical: 15, borderRadius: 8, marginTop:25,
        justifyContent: "center", alignItems: "center", backgroundColor:"#5969ED"
    }
})

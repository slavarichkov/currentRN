import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useTranslate } from '../../../contexts/translate/TranslateContext';
import TextInputWithLabelInside from "../../Inputs/TextInputWithLabelInside"
import ButtonSetting from "../../../screens/setting/GlobalSettingScreen/components/ButtonSetting"

const FormSendAndSaveCountersData = () => {

    const { selectedTranslations } = useTranslate();

    const arrayCountersObj = [
        { nameCounter: 'Холодная вода', data: 'Данные счетчика', date: new Date().toString() },
        { nameCounter: 'Горячая вода', data: 'Данные счетчика', date: new Date().toString() },
        { nameCounter: 'Электричество', data: 'Данные счетчика', date: new Date().toString() },
        { nameCounter: 'Отопление', data: 'Данные счетчика', date: new Date().toString() },
        { nameScreen: 'Gas', nameCounter: 'Газ', data: 'Данные счетчика', date: new Date().toString() },
    ]

    const [currents, setCurrents] = useState(arrayCountersObj)

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <>
                    {arrayCountersObj.map((counter) => {
                        return (
                            <TextInputWithLabelInside
                                key={counter.nameCounter}
                                label={counter.nameCounter ? counter.nameCounter : ''}
                                placeholder={counter.nameCounter}
                                value={counter.data}
                                onClickInput={() => { console.log('onClickInput') }}
                                onChangeText={() => { }}
                            />
                        )
                    })}
                </>
            </View>
            {/* Выбор Языка */}
            <View style={[styles.containerButtons, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                <ButtonSetting text={selectedTranslations.save} onClick={() => { }} />
                <Text style={styles.textNameButtonContainer}>{''}</Text>
                <ButtonSetting text={selectedTranslations.send} onClick={() => { }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'space-between',
        paddingTop: 70,
    },
    containerInfo: {
        width: '90%',
        // marginTop: 30,
        // marginBottom: 30,
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 20,
    },
    containerButtons: {
        marginTop: 20,
        alignItems: 'center',
        width: '90%',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textNameButtonContainer: {
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(0,0,0,1)',
    },
})

export default FormSendAndSaveCountersData;
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Selector from "../Selector";

import imgWater from '../../../../images/drop-svgrepo-com.png';
import imgElectrocity from '../../../../images/electricity-svgrepo-com.png';
import imgHeat from '../../../../images/radiators-heat-svgrepo-com.png';
import imgGas from '../../../../images/gas-burner-svgrepo-com.png';

interface CountersSelectorProps {
    initalState?: string[];
    handleChangeSelectors: (namesArray: string[]) => void;
}

/**
 * Компонент для выбора счетчиков.
 *
 * @component
 * @example
 * // Пример использования:
 * <CountersSelector
 *   initalState={['Холодная вода', 'Электричество']}
 *   handleChangeSelectors={(selectedCounters) => console.log(selectedCounters)}
 * />
 *
 * @param {Object} props - Свойства компонента.
 * @param {string[]} [props.initalState] - Начальное состояние выбранных счетчиков.
 * @param {(selectedCounters: string[]) => void} props.handleChangeSelectors - Функция обратного вызова, вызываемая при изменении выбранных счетчиков.
 * @returns {JSX.Element} Компонент для выбора счетчиков.
 */
const CountersSelector: React.FC<CountersSelectorProps> = ({ initalState, handleChangeSelectors }) => {

    const [counters, setCounters] = useState([
        { name: 'Холодная вода', state: false },
        { name: 'Горячая вода', state: false },
        { name: 'Электричество', state: false },
        { name: 'Отопление', state: false },
        { name: 'Газ', state: false },
    ])
    const namesCountersArray = ['Холодная вода', 'Горячая вода', 'Электричество', 'Отопление', 'Газ'];

    /**
    * Обработчик изменения состояния счетчика.
    *
    * @param {string} name - Название счетчика.
    */
    function onCountersChanged(name: string) {
        setCounters(prevCounters =>
            prevCounters.map(counter =>
                counter.name === name ? { ...counter, state: !counter.state } : counter
            )
        );
    }

    /**
      * Получение состояния счетчика по его названию.
      *
      * @param {string} name - Название счетчика.
      * @returns {boolean} Состояние счетчика (выбран/не выбран).
      */
    function getState(name: string) {
        const counterObject = counters.find(counter => counter.name === name);
        if (counterObject) {
            return counterObject.state;
        }
    }

    useEffect(() => {
        const inital = initalState ? initalState : namesCountersArray;
        inital.forEach((nameCounter: string) => {
            onCountersChanged(nameCounter)
        })
    }, [initalState])

    // Отслеживать и возвращать объект выбранных селекторов
    useEffect(() => {
        const namesArray = counters
            .filter(counter => counter.state === true)
            .map(counter => counter.name);
        if (handleChangeSelectors) {
            if (namesArray.length > 0) {
                handleChangeSelectors(namesArray);
            } else {
                handleChangeSelectors(namesCountersArray);
            }
        }
    }, [counters])

    return (
        <View style={styles.container}>
            <Selector
                isOneSelect={true} isTwoSelect={true} isThreeSelect={true} isFourSelect={true} isFiveSelect={true}
                onClickOne={() => onCountersChanged('Холодная вода')}
                onClickTwo={() => onCountersChanged('Горячая вода')}
                onClickThree={() => onCountersChanged('Электричество')}
                onClickFour={() => onCountersChanged('Отопление')}
                onClickFive={() => onCountersChanged('Газ')}
                imgOne={imgWater} imgTwo={imgWater} imgThree={imgElectrocity} imgFour={imgHeat} imgFive={imgGas}
                styleWidth={'100%'}
                styleButtonOne={getState('Холодная вода') ? styles.buttonActive : styles.button}
                styleButtonTwo={getState('Горячая вода') ? styles.buttonActive : styles.button}
                styleButtonThree={getState('Электричество') ? styles.buttonActive : styles.button}
                styleButtonFour={getState('Отопление') ? styles.buttonActive : styles.button}
                styleButtonFive={getState('Газ') ? styles.buttonActive : styles.button}
                styleImage={{ width: 20, height: 20, }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonActive: {
        opacity: 1,
    },
    button: {
        opacity: 0.3,
    }
})

export default CountersSelector
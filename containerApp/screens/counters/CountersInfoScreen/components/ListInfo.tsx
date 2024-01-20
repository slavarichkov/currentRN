import { View } from "react-native";
import { TypeCounterInfo } from "../../types/types";
import ItemContainerInfo from "./ItemContainerInfo";


interface ListInfoProps {
    countersData: TypeCounterInfo[] | any; // Замените на ваш тип данных
}

/**
 * Компонент для отображения списка данных всех счетчиков по актуальным измерениям.
 * @param {ListInfoProps} props - Пропсы компонента.
 * @returns {React.ReactNode} Список данных счетчиков.
 */
const ListInfo: React.FC<ListInfoProps> = ({ countersData }) => {
    return (
        countersData.map((counter: any) => {
            return (
                <View key={counter.name}>
                    <ItemContainerInfo dataCounter={counter} />
                </View>
            )
        })
    )
}

export default ListInfo;
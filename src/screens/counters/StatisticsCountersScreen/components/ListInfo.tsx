import { View } from "react-native";
import ItemContainerInfo from "./ItemContainerInfo";

interface ItemListReadingsProps {
    item: {
        date: string;
        id: number;
        idAddress: string;
        meterReadings: string;
    };
}
interface ListInfoProps {
    countersData: {
        date: string;
        id: number;
        idAddress: string;
        meterReadings: string;
    }[];
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
                <View key={counter.nameCounter}>
                    <ItemContainerInfo dataCounter={counter} />
                </View>
            )
        })
    )
}

export default ListInfo;
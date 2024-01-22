import { useEffect, useState } from "react";
import Chart from "../../../../componentsShared/chart/Chart";
import { useTheme } from "../../../../contexts/theme/ThemeContext";
import { useTranslate } from "../../../../contexts/translate/TranslateContext";
import Loader from "../../../../componentsShared/loaders/Loader";

type Component = {
    dataForChart: any;
}

/** Компонент c графиком стоимости */
const ChartReadings: React.FC<Component> = ({ dataForChart }) => {

    const { backgroundColor } = useTheme();
    const { selectedTranslations } = useTranslate();

    const init = {
        labels: ['1', '2'],
        datasets: [
            {
                data: [0, 1],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
    };

    const [data, setData] = useState<any>(init);

    const chartConfig = {
        backgroundGradientFrom: backgroundColor.backgroundColor,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: backgroundColor.backgroundColor,
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
    };

    useEffect(() => {
        if (dataForChart) {
            let arrayMonth = dataForChart.map((item: any) => {
                return item.month;
            })
            if (arrayMonth.length < 2) {
                arrayMonth.unshift('нач');
            }
            let arrayCosts = dataForChart.map((item: any) => {
                return item.cost
            })
            if (arrayCosts < 2) {
                arrayCosts.unshift(0)
            }
            const data = {
                labels: arrayMonth,
                datasets: [
                    {
                        data: arrayCosts,
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    }
                ],
            }
            setData(data);
        }

    }, [dataForChart])

    return (
        dataForChart ?
            <Chart
                data={data}
                bezier={true}
                chartCustomConfig={chartConfig}
                verticalLabelRotation={90}
            />
            : <Loader />
    )
}


export default ChartReadings;
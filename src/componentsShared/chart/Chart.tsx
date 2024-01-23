import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

type ChartData = {
    labels: string[];
    datasets: {
        data: number[];
        color?: (opacity: number) => string;
        strokeWidth?: number;
    }[];
    legend?: string[];
};

interface ChartConfig {
    backgroundGradientFrom: string;
    backgroundGradientFromOpacity: number;
    backgroundGradientTo: string;
    backgroundGradientToOpacity: number;
    color: (opacity: number) => string;
    strokeWidth?: number;
    barPercentage?: number;
}

interface ChartProps {
    data: ChartData;
    bezier?: boolean;
    chartCustomConfig?: ChartConfig
    verticalLabelRotation?: number;
    chartWidth?: number;
    segments?: number;
}

/**
 * Типы пропсов для компонента Chart.
 * @interface ChartProps
 * @property {any} data - Данные для графика.
 * @example 
* const data = {
* labels: ["January", "February", "March", "April", "May", "June"],
* datasets: [
* {
*   data: [20, 45, 28, 80, 99, 43],
*    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
*    strokeWidth: 2 // optional
*  }
* ],
* legend: ["Sunny Days"] // optional
*};
 * @property {boolean} bezier - Использовать ли кривую Безье для линейного графика.
 * @property {ChartConfig} [chartCustomConfig] - Пользовательская конфигурация для графика (необязательно).
 */

/**
 * Опции конфигурации для компонента LineChart.
 * @interface ChartConfig
 * @property {string} backgroundGradientFrom - Начальный цвет градиента фона графика.
 * @property {number} backgroundGradientFromOpacity - Прозрачность начального цвета.
 * @property {string} backgroundGradientTo - Конечный цвет градиента фона графика.
 * @property {number} backgroundGradientToOpacity - Прозрачность конечного цвета.
 * @property {(opacity: number) => string} color - Функция, возвращающая цвет для линий графика.
 * @property {number} [strokeWidth=2] - Ширина линий графика (необязательно, по умолчанию 2).
 * @property {number} [barPercentage=0.5] - Процент ширины столбца (необязательно, по умолчанию 0.5).
 */

/**
 * Компонент линейного графика.
 * @param {ChartProps} props - Пропсы компонента.
 * @returns {JSX.Element} - Визуализация компонента.
 */
const Chart: React.FC<ChartProps> = ({ data, bezier, chartCustomConfig, verticalLabelRotation, chartWidth, segments }) => {

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: '#fff',
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Цвет линий
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
    };

    return (
        <LineChart
            data={data}
            width={chartWidth ? chartWidth : screenWidth}
            height={256}
            verticalLabelRotation={verticalLabelRotation ? verticalLabelRotation : 0}
            chartConfig={chartCustomConfig ? chartCustomConfig : chartConfig}
            bezier={bezier}
            segments={segments ? segments : 4}
        />
    )
}

export default Chart;
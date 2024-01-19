import { useEffect } from "react";
import { View } from "react-native";
import { useTheme } from '../../../contexts/theme/ThemeContext';

/** Компонент заглушка */
function RightScreen({ navigation, route }) {

    const { backgroundColor } = useTheme();
    const { screenNavigator } = route.params;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Действия, которые нужно выполнить при фокусе на экране Screen3
            navigation.navigate(screenNavigator)
        });

        return unsubscribe;
    }, [navigation]);

    return (<View style={[backgroundColor, { flex: 1 }]}></View>)
}

export default RightScreen;
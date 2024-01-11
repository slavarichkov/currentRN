import { View, StyleSheet, Text } from "react-native";

function CountersScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.absolute}>Hi, I am some blurred text</Text>
        {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
        <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor:'blue',
    },
    absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  });

export default CountersScreen;

// import { View } from "react-native";

// function CountersScreen() {
//     return (
//         <View>

//         </View>
//     )
// }

// export default CountersScreen;
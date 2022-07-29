import { StyleSheet } from 'react-native';
import Colors from '../../assets/colors/colors';

const HomeStyles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    safeArea: {
        backgroundColor:Colors.white,
        flex: 1
    },
    profileImage: {
        height:50,
        width: 50,
        borderRadius: 25,
    },
    contentontainerStyle:{
        paddingLeft: 20,
       
        // paddingVertical: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        
      },
      modalView: {
        paddingTop: 220,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#FFFFFF",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      blurView:{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
        }
})

export default HomeStyles;
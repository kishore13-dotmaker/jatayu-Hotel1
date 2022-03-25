import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../assets/colors/colors";

const { width } = Dimensions.get("screen");
const DetailsStyles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  ImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    height: 350,
  },
  ImageBackground: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 40,
    width: 40,
    backgroundColor: Colors.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  DetailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 16,
    color: Colors.greyHome,
  },
  detailsText: {
    marginTop: 15,
    color: Colors.greyHome,
  },
  phoneImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: Colors.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerText: {
    color: Colors.blueHome,
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10,
  },
  bookNow: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
  row: {
    flexDirection: "row",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
      alignItems: 'center'
    },
    picker: {
      width: 300,
      height: 45,
      borderColor: 'blue',
      // borderwidth: 1
    },
});

export default DetailsStyles;

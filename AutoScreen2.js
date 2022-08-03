import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";
//import base64 from "react-native-base64";
import { BleManager, Device } from "react-native-ble-plx";
import Geolocation from "react-native-geolocation-service";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

const BLTManager = new BleManager();
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const AZIMUTH_UUID = "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd";
const ELEVATE_UUID = "f27b53ad-c63d-49a0-8c0f-9f297e6cc520";

const DATA = [
  {
    id: "eaa7bcae-997b-4175-a504-3056831b3761",
    title: "GEOS 18",
    longitude: 89.5,
  },
  {
    id: "4011541e-4ae9-4b5b-b5ef-1068052daf39",
    title: "INMARSSAT 6-F1",
    longitude: -141.1,
  },
  {
    id: "3d0857f5-e38c-4e08-96d4-0dbe5b91c695",
    title: "TURKSAT 5G",
    longitude: -42.2,
  },
  {
    id: "49b96820-4af8-419e-9074-9b6b9a6b627f",
    title: "SES 17",
    longitude: 67,
  },
  {
    id: "a205a88b-55a3-4e26-bbb0-dfe6cd150ac3",
    title: "TJS-7",
    longitude: -146.5,
  },
  {
    id: "d51e441b-381b-44e3-9474-a2aa6a5cf05a",
    title: "CHINASAT 2E",
    longitude: -98,
  },
  {
    id: "7235d89d-4954-45b5-86b6-3b433b3ee731",
    title: "TURKSAT 5A",
    longitude: -30.9,
  },
  {
    id: "a8ead2a4-6c65-4475-9d6e-be8640c76ec0",
    title: "CMS-01",
    longitude: -83,
  },
  {
    id: "28fac61f-ad7b-4677-a36e-df9aa3791cf2",
    title: "GALAXY 30",
    longitude: 125,
  },
  {
    id: "d5cfb520-05cc-4ba5-bc7b-fe7625b1fab2",
    title: "BEIDOU 3 G2",
    longitude: -80,
  },
  {
    id: "7236f433-a57e-4a70-8da0-779834bb855d",
    title: "GEO-KOMPSAT-2B",
    longitude: -128.2,
  },
  {
    id: "8b4cf703-f6d4-444f-8c63-e39f82ca6648",
    title: "JCSAT 17",
    longitude: -135.9,
  },
  {
    id: "0ad9da62-1835-4b43-9b9f-147e0eac9c54",
    title: "EUTELSAT KONNECT",
    longitude: -7.2,
  },
  {
    id: "758d45fd-f33b-4936-aaf3-df06f632f9c3",
    title: "GSAT 30",
    longitude: -83,
  },
  {
    id: "d80e4d4c-86a4-420c-959f-c36005a2b9f9",
    title: "SJ-20",
    longitude: -73.9,
  },
  {
    id: "c7b26beb-f3a0-452f-a244-e1b2370b407b",
    title: "INMARSAT GX5",
    longitude: -11,
  },
  {
    id: "82a95823-7e9d-415c-bf22-2f8dc6d25001",
    title: "TIBA-1",
    longitude: -35.5,
  },
  {
    id: "77e79734-ce3a-4e41-891f-aa114be8b329",
    title: "EUTELSAT 5 WEST B",
    longitude: 5,
  },
  {
    id: "8a4c1bc9-950d-4bab-b5e5-a0bf8644559b",
    title: "AMOS 17",
    longitude: -17,
  },
  {
    id: "f83ca2d3-327f-49f5-a42d-16b7d83f3897",
    title: "INTELSAT 39",
    longitude: -61.9,
  },
  {
    id: "21bcdeff-0755-4a3f-8264-eaedfafee72e",
    title: "EDRS-C",
    longitude: -31.2,
  },
  {
    id: "03c4b4e3-8fe0-446e-ac90-6b55e5dfeac6",
    title: "EUTELSAT 7C",
    longitude: -7,
  },
  {
    id: "5046e84c-6366-44c6-9049-f19472941d5a",
    title: "AT&T T-16",
    longitude: 100.9,
  },
  {
    id: "fc6af8c0-655f-4974-a6a6-0a1301c1bc54",
    title: "ARABSAT 6A",
    longitude: -30.5,
  },
  {
    id: "6767f468-84c5-4e77-8525-6b74d6659619",
    title: "TIANLIAN 2-01",
    longitude: -80.1,
  },
  {
    id: "3ae2ba2c-d4bf-422c-93f6-b1e3cd9cba73",
    title: "WGS 10 (USA 291)",
    longitude: -60.3,
  },
  {
    id: "e3f5ec3c-9053-4c9b-b526-b477935d5352",
    title: "CHINASAT 6C",
    longitude: -125.1,
  },
  {
    id: "6a74cbe4-60a9-4c5a-8c6f-14bd75022c44",
    title: "GSAT 11",
    longitude: -73.9,
  },
  {
    id: "780107a2-1b8c-44a0-84e4-5fdcaff521fe",
    title: "GEO-KOMPSAT-2A",
    longitude: -128.2,
  },
  {
    id: "2e7e108e-ce2b-4586-baba-37ec5c56e18b",
    title: "ESHAIL 2 (QO-100)",
    longitude: -25.8,
  },
  {
    id: "2a29f1b0-b47a-4e61-8732-b870970d2e38",
    title: "GSAT 29",
    longitude: -55.1,
  },
];

function calc(l, n, s) {
  var azimuthresult, elevationresult;
  var azi;
  var ele;
  var g = s - n;

  var grad = g / 57.29578;
  var lrad = l / 57.29578;

  azi = 3.14159 - -Math.atan(Math.tan(grad) / Math.sin(lrad));

  azimuthresult = azi * 57.29578;

  var a = Math.cos(grad);
  var b = Math.cos(lrad);
  ele = Math.atan((a * b - 0.1512) / Math.sqrt(1 - a * a * (b * b)));

  elevationresult = ele * 57.29578;

  return [azimuthresult, elevationresult];
}

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

async function App () {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState([]);

  const [locationStatus, setLocationStatus] = useState("");
  const [currentLongitude, setCurrentLongitude] = useState("...");
  const [currentLatitude, setCurrentLatitude] = useState("...");
  const [selectedId, setSelectedId] = useState(null);
  

  async function connectBT() {
    BLTManager.startDevicescan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }

      if (scannedDevice && scannedDevice.name == "BLE_fyp") {
        BLTManager.stopDeviceScan();
        
        scannedDevice
          .connect();
          .then(scannedDevice => {
            setConnectedDevice(scannedDevice);
            setIsConnected(true);
            return scannedDevice.discoverAllServicesAndCharacteristics();
          })
          .then(scannedDevice => {
            BLTManager.onDeviceDisconnected(scannedDevice.id, (error, scannedDevice) => {
              console.log('Device DC');
              setIsConnected(false);
            });

            console.log('Connection established');
            ToastAndroid.show("Device connected", ToastAndroid.SHORT);
          });
      }
    });

    setTimeout(() => {
      BLTManager.stopDeviceScan();
    }, 5000);
  }

  const dataArray = [10, 0];

  const getOneTimeLocation = () => {
    setLocationStatus("Getting Location...");
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus("You are Here");
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus("You are Here");
        console.log(position);

        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      }
    );
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message:
                "This App needs to access your location to calculate azimuth and elevation angle",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus("Permission Denied");
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  async function getLongitude(satlongitude, gpslatitude, gpslongitude) {
    console.log(
      satlongitude,
      ", curr Lat: ",
      gpslatitude,
      "- current Long: ",
      gpslongitude
    );

    dataArray = calc(gpslatitude, gpslongitude, satlongitude);
    var azimuthTemp, elevateTemp;
    azimuthTemp = dataArray[0];
    elevateTemp = dataArray[1];

    BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice?.id,
      SERVICE_UUID,
      AZIMUTH_UUID,
      base64.encode(azimuthTemp)
    );

    BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice?.id,
      SERVICE_UUID,
      ELEVATE_UUID,
      base64.encode(elevateTemp)
    );
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          getLongitude(item.longitude, currentLatitude, currentLongitude);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;

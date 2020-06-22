import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign, MaterialIcons, Octicons } from "@expo/vector-icons";
//import { Audio } from "expo-av";
const soundObject = new Audio.Sound();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      pause: "false",
      image: "./play.png",
      name: "play",
      ismute: false,
    };
  }
  componentDidMount() {
    soundObject.loadAsync(require("./hindi.mp3"));
  }
  handlePlayPause = async () => {
    const { isPlaying } = this.state;
    isPlaying ? await soundObject.pauseAsync() : await soundObject.playAsync();

    this.setState({
      isPlaying: !isPlaying,
    });
  };
  Replay = async () => {
    soundObject.replayAsync();

    this.setState({
      isPlaying: true,
    });
  };
  MuteUnmute = async () => {
    const { ismute } = this.state;
    ismute
      ? await soundObject.setIsMutedAsync(false)
      : await soundObject.setIsMutedAsync(true);

    this.setState({
      ismute: !ismute,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
          {this.state.isPlaying ? (
            <Ionicons name="ios-pause" size={48} color="#444" />
          ) : (
            <Ionicons name="ios-play-circle" size={48} color="#444" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.Replay();
          }}
        >
          <MaterialIcons
            name="replay"
            size={48}
            //color="black"
            style={styles.control}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.control}
          onPress={() => {
            this.MuteUnmute();
          }}
        >
          {this.state.ismute ? (
            <Octicons name="unmute" size={48} color="#444" />
          ) : (
            <Octicons name="mute" size={48} color="#444" />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  control: {
    margin: 20,
  },
});

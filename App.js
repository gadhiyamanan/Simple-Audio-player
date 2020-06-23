import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Slider,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign, MaterialIcons, Octicons } from "@expo/vector-icons";

const soundObject = new Audio.Sound();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      position: 0,
      timeLeft: "",
      ismute: false,
      remaintime: "",
      positiontime: "",
      durationtime: "",
      isdurationorposition: true,
    };
    soundObject.loadAsync(require("./hindi.mp3"));
  }

  getStatus = async () => {
    var status = await soundObject.getStatusAsync();
    var percentage =
      (status["positionMillis"] / status["durationMillis"]) * 1000;
    var remainingTime = status["durationMillis"] - status["positionMillis"];
    var remainminute = remainingTime / 1000 / 60;
    var remainsecond = (remainingTime / 1000) % 60;
    var positionminute = status["positionMillis"] / 1000 / 60;
    var positionsecond = (status["positionMillis"] / 1000) % 60;
    var durationminute = status["durationMillis"] / 1000 / 60;
    var durationsecond = (status["durationMillis"] / 1000) % 60;
    this.setState({
      position: percentage,
      timeLeft: remainingTime,
      remaintime:
        remainminute.toString().split(".")[0] +
        ":" +
        remainsecond.toString().split(".")[0],
      positiontime:
        positionminute.toString().split(".")[0] +
        ":" +
        positionsecond.toString().split(".")[0],
      durationtime:
        durationminute.toString().split(".")[0] +
        ":" +
        durationsecond.toString().split(".")[0],
    });
  };
  componentDidMount() {
    this.interval = setInterval(() => this.getStatus(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
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
  durationposition = async () => {
    this.setState({
      isdurationorposition: !this.state.isdurationorposition,
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
  onValueChange = async (value) => {
    var status = await soundObject.getStatusAsync();
    var p = (value / 1000) * status["durationMillis"];
    soundObject.setStatusAsync({ positionMillis: p });
    var percentage = (p / status["durationMillis"]) * 1000;
    this.setState({
      position: percentage,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black" }}>{this.state.positiontime}</Text>

          <Slider
            minimumValue={1}
            maximumValue={1000}
            minimumTrackTintColor="#1EB1FC"
            maximumTractTintColor="#1EB1FC"
            step={1}
            value={this.state.position}
            onValueChange={(value) => this.onValueChange(value)}
            style={styles.slider}
            thumbTintColor="#1EB1FC"
          />
          <TouchableOpacity onPress={this.durationposition}>
            {this.state.isdurationorposition ? (
              <Text
                style={{
                  color: "black",
                }}
              >
                {this.state.durationtime}
              </Text>
            ) : (
              <Text
                style={{
                  color: "black",
                }}
              >
                -{this.state.remaintime}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.Replay();
            }}
          >
            <MaterialIcons
              name="replay"
              size={48}
              //color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handlePlayPause}
            style={{ marginLeft: 70, marginRight: 70 }}
          >
            {this.state.isPlaying ? (
              <Ionicons name="ios-pause" size={48} color="#444" />
            ) : (
              <Ionicons name="ios-play-circle" size={48} color="#444" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
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
  },
  slider: {
    width: 300,
  },
  control: {
    margin: 2,
  },
});

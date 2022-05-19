import React, { useState, useContext } from "react";
import { View, Keyboard } from "react-native";
import { useTheme } from "react-native-paper";

import { IconButton, TextInput } from "../../elements";
import { AuthContext } from "../../context";
import { apiSetMessages } from "../../firebase-api";
import { RS } from "../../strings";

const CommentInput = ({ event, navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const [comment, setComment] = useState();
  const { messages, id } = event;

  const saveComment = () => {
    if (!currentUser) {
      return navigation.navigate(RS.landing, {
        message: "Oops! Please sign in!",
      });
    }
    const newComment = {
      user: currentUser.id,
      comment,
      createdDate: new Date(Date.now()),
    };
    apiSetMessages({ newComment, id, messages })
      .then((res) => {
        setComment(null);
        Keyboard.dismiss();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        backgroundColor: "white",
        justifySelf: "flex-end",
        padding: 8,
      }}
    >
      <TextInput
        placeholder="Add comment..."
        onChangeText={(e) => setComment(e)}
        value={comment}
        multiline
        style={{
          paddingLeft: 12,
          paddingRight: 12,
          paddingVertical: 8,
          backgroundColor: colors.p4,
          flexShrink: 1,
        }}
      />
      <IconButton icon="send" color={colors.p1} onPress={saveComment} />
    </View>
  );
};

export default CommentInput;

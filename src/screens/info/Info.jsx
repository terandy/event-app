import React from "react";
import { View, Text, Linking, Pressable, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";

import { Title, Layout } from "../../elements";
import { PersonCard } from "../../components";
import { padding } from "../../theme";
import { RS } from "../../strings";

const Info = ({ navigation }) => {
  const { colors } = useTheme();
  const people = [
    {
      displayName: "Koshin Young",
      title: "YSP Chairman, Canada",
      description:
        "What to say about this awesome human being? He’s kind-hearted, fun to be around, but most importantly has an amazing sense of empathy and compassion for others. He’s in a way the perfect leader to raise our younger generation to Heavenly Parent.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/ysp-app-294f8.appspot.com/o/events%2Fkoshin_young.png?alt=media&token=84bd52b7-6eba-44d0-ba22-89436ecafca1",
    },
    {
      displayName: "John Koester",
      title: "YSP President, Canada",
      description:
        "Poised, dignified, John is probably the descendant of European royalty. His class and brilliance helps to execute YSP projects in a way that is relevant to our modern society. What a jewel we have in John – I’m sure other countries envy Canada’s President.  ",
      image:
        "https://firebasestorage.googleapis.com/v0/b/ysp-app-294f8.appspot.com/o/events%2Fjohn_koester.jpg?alt=media&token=e6ebd877-a992-4de4-abd5-ff108a4d2dd8",
    },
    {
      displayName: "Francois Lacroix",
      title: "YSP Coordinator, Montreal",
      description:
        "I’m the one writing all the blurbs, so what to say about myself? Hm… I’m amazing. Period.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/ysp-app-294f8.appspot.com/o/events%2Ffrancois_lacroix.jpg?alt=media&token=a3d7fcd6-9d08-412e-b231-2f34084139a4",
    },
    {
      displayName: "Hirotoshi Yuzawa",
      title: "YSP Coordinator, Vancouver",
      description:
        "He is the son of the man who saved True World Foods from bankruptcy. Now, Hirotoshi is on a path to make a name for himself. Hiro for short, is indeed the man we need for Vancouver. His care for others and diligent work ethic is why Heavenly Parent works so easily through him. Hiro, you are our ‘Hero’!",
    },
  ];

  const credits = [
    {
      roleDescription: "Produced by",
      name: "François L.",
    },
    {
      roleDescription: "Designed by",
      name: "Kimberly G.",
    },
    {
      roleDescription: "Developed by",
      name: "Teresa L.",
    },
    {
      roleDescription: "Edited by",
      name: "Hyung Tae F.",
    },
  ];

  const creditsRows = [];

  const renderCreditRow = (key, roleDescription, name) => {
    return (
      <Text key={key} style={{ textAlign: "center", marginBottom: 12 }}>
        {roleDescription}: {name}
      </Text>
    );
  };

  for (let i = 0; i < credits.length; i++)
    creditsRows.push(
      renderCreditRow(i, credits[i].roleDescription, credits[i].name)
    );

  return (
    <Layout>
      <ScrollView
        style={{
          paddingHorizontal: padding.medium,
          flex: 1,
          paddingBottom: padding.large * 2.5,
        }}
      >
        <Title size="large">About</Title>
        <Text>
          The app's purpose is to provide younger generations within the
          Heavenly Parent Holy Community a means to promote events and
          activities that are meaningful to them. Created by blessed children
          for blessed children, the creators of this app hope that users can
          develop a sense of solidarity and unity in our common cause to support
          True Parent's providence.
        </Text>
        <Title size="large" style={{ marginTop: 88, marginBottom: 32 }}>
          Meet the team
        </Title>
        <View style={{ marginBottom: 0 }}>
          {people.map((person) => (
            <PersonCard
              key={person.displayName}
              {...person}
              style={{ marginBottom: 24 }}
            />
          ))}
          <Title style={{ marginBottom: 24, marginTop: 32 }}>
            Special Thanks to you
          </Title>
          <Text>
            For all the numerable others who volunteer and help YSP, you are the
            reason YSP is amazing. Truly lots of credit goes to you, thank you!
          </Text>
        </View>

        <Text style={{ textAlign: "center", marginTop: 88 }}>
          Contact us via
        </Text>
        <Pressable
          onPress={() =>
            Linking.openURL("mailto://yspcanada@outlook.com").catch((err) =>
              console.log(err)
            )
          }
        >
          <Text
            selectable={true}
            style={{ textAlign: "center", marginBottom: 32, color: colors.p1 }}
          >
            yspcanada@outlook.com
          </Text>
        </Pressable>
        <Text style={{ textAlign: "center" }}>
          Notify us of any inapropriate content via
        </Text>
        <Text
          selectable={true}
          style={{ textAlign: "center", marginBottom: 32, color: colors.p1 }}
        >
          teresa.s.lacroix@gmail.com
        </Text>
        <Text style={{ textAlign: "center" }}>Or visit us on</Text>
        <Pressable
          onPress={() =>
            Linking.openURL("https://www.yspcanada.org/").catch((err) =>
              console.log(err)
            )
          }
        >
          <Text
            style={{
              textAlign: "center",
              marginBottom: 32,
              textDecorationLine: "underline",
              color: colors.p1,
            }}
          >
            www.yspcanada.org
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(RS.eula)}>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 32,
              color: colors.p1,
              textDecorationLine: "underline",
            }}
          >
            End-User License Agreement
          </Text>
        </Pressable>
        {creditsRows}
      </ScrollView>
    </Layout>
  );
};
export default Info;

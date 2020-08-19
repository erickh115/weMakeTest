import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Left,
  Right,
} from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome';
const allNews = gql`
  query {
    newlist {
      id
      title
      points
      author
      time
      weblink
    }
  }
`;

const UserQuery = () => {
  const {loading, error, data} = useQuery(allNews);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error || !data) {
    return <Text>Error...</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Container>
          <Content>
            {data.newlist &&
              data.newlist.map((news) => {
                return (
                  <Card>
                    <CardItem header>
                      <Text style={{borderWidth: 1, margin: 5}}>{news.id}</Text>

                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL(`${news.weblink}`);
                        }}>
                        <Text style={styles.text}>{news.title}</Text>
                      </TouchableOpacity>
                    </CardItem>

                    <CardItem>
                      <Text style={styles.inputStyle}>{news.points}</Text>
                      <CardItem>
                        <Text style={{fontSize:15,textAlign:"right"}}>
                          author: {news.author} {news.time}
                        </Text>
                      </CardItem>

                      <CardItem>
                        <Text numberOfLines={1}></Text>
                      </CardItem>
                    </CardItem>
                  </Card>
                );
              })}
          </Content>
        </Container>
      </View>
    </ScrollView>
  );
};

// style={{flex: 1, flexDirection: 'row'}

export default UserQuery;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  inputStyle: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'left',
    padding: 1,
    // lineHeight: 20,
  },
  header: {
    padding: 2,
    // borderWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    textAlign: 'left',
    alignSelf: 'stretch',
    fontSize: 14,
  },
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Data {
  id: Number;
  name: String;
  description: String;
  stars: Number;
  forks: Number;
}

interface Props {
  data: Data;
}

const Repository: React.FC<Props> = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {data.description}
      </Text>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Icon name="star" size={16} color="#333" />
          <Text style={styles.statCount}>{data.stars}</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="code-fork" size={16} color="#333" />
          <Text style={styles.statCount}>{data.forks}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 4,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    color: '#666',
    marginTop: 5,
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 15,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statCount: {
    marginLeft: 6,
  },
});

export default Repository;

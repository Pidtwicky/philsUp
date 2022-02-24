import { StyleSheet} from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import Header from '../components/Header';
import  Post from '../components/Post';
import Stories from '../components/Stories';
import {POSTS}  from '../../data/posts';

const FeedScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stories />
      <ScrollView>
        {POSTS.map((post, index) => (
         <Post post={post} key={index} /> 

        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "grey",
        flex: 1,
    },
})



export default FeedScreen;
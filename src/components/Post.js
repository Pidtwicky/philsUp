import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Divider } from 'react-native-elements';


const postFooterIcons = [
    {
        name: 'Like',
        imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEXvXP_V74dFL3-kVpDjJkxKjM3xa_1CR5cg&usqp=CAU',
        likedImageUrl:'https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/2x/external-heart-miscellaneous-kiranshastry-lineal-color-kiranshastry.png'
    },
    {
        name: 'Comment',
        imageUrl:
        'https://img.icons8.com/fluency/2x/speech-bubble.png',
    },
    {
        name: 'Share',
        imageUrl:
        'https://img.icons8.com/fluency/2x/share-2.png',
    },
    {
        name: 'Save',
        imageUrl:'https://img.icons8.com/fluency/2x/save.png',
    },

]


const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
        <Divider width={1} orientation='vertical' />
        <PostHeader post={post} />
        <PostImage post={post} />
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
          <PostFooter /> 
          <Likes /> 
        </View>
    </View>
  )
}

    const PostHeader = ({ post }) => (
        <View 
            style={{ 
                flexDirection: 'row' , 
                justifyContent: 'space-between',
                margin:5, 
                alignItems:'center'  
            }}
            
        >
            <View style={{ flexDirection:'row', alignItems: 'center' }} >
                {/* <Image source={{ uri: post.profile_picture}} style={styles.story} />
                <Text style={{ color: 'white', marginLeft:5, fontWeight:'700' }}>
                    {post.user}
                </Text> */}
            </View>

            <Text style={{ color: 'white', fontWeight: '900' }}>...</Text>
        </View>
    )
    const PostImage = ({post}) => (
        <View
            style={{ 
                width: '100%',
                height: 450,
            }}
        >
            <Image source={{ uri: post.imageUrl }}
            style={{ height: '100%', resizeMode:'cover' }}
            />
        </View>
    )

const PostFooter = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style= {styles.leftFooterIconsContainer }>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl}/>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl}/>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl}/>
        </View>

        <View>
            <Icon imgStyle={ styles.footerIcon } imgUrl={postFooterIcons[3].imageUrl } />
        </View>
    </View>

)

const Icon = ({ imgStyle, imgUrl }) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imgUrl}} />
    </TouchableOpacity>

)

const Likes = ({ post }) => (
   <Text style={{ color: 'white' }}>likes</Text> 
)

const styles = StyleSheet.create({
    story:{
        width: 35,
        height: 35,
        borderRadius:50,
        marginLeft:6,
        borderWidth:1.6,
        borderColor:'#ff8501'
    },

    footerIcon:{
        width: 33,
        height: 33,
    },

    leftFooterIconsContainer: {
        flexDirection: 'row',
        width: '32%' ,
        justifyContent: 'space-between',
    },
})

export default Post;
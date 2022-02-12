import { USERS } from './users'

export const POSTS = [
    {
        imageUrl:'https://cdn.pixabay.com/photo/2020/08/13/15/50/mountains-5485678__340.jpg',
        user: USERS[0].user,
        likes:8787,
        caption:'En voyage vers de beaux endroits',
        profile_picture: USERS[0].image,
        comments: [
            {
                user:'MarcoPaulo',
                comment:"Wow c' est magnifique"
            },
            {
                user:'Cletent.dev',
                comment:"j'aimerai aussi ai etre"
            },


        ],
    },
    {
        imageUrl:'https://cdn.pixabay.com/photo/2021/12/15/04/48/animal-6871771__340.jpg',
        user: USERS[1].user,
        likes:7817,
        caption:'Je vous présente mon lapin Bugs',
        profile_picture: USERS[1].image,
        comments: [
            {
                user:'Fatman',
                comment:'il est mignon'
            },
            {
                user:'Arlap',
                comment:'Il doit etre intelligent loool'
            },


        ],
    },


]
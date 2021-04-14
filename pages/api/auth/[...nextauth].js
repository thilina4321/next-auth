import NextAuth from 'next-auth'
import Provider from 'next-auth/providers'

// database imports
import {connectDb} from '../../../helper/db'
import User from '../../../model/user'
import {comparePassword} from '../../../helper/hash'

export default NextAuth({
    session:{
        jwt:true,
    },
    providers:[
        Provider.Credentials({
            async authorize(credentials){
                try {
                    // connect to the database
                    await connectDb()
                    // check email is exist or not
                    const user = await User.findOne({email:credentials.email})
                    console.log(user);
                    if(!user){
                        throw new Error('User not found')
                    }

                    // check password is correct or not
                    const isValid = await comparePassword(credentials.password, user.password)
                    if(!isValid){
                        throw new Error('Could not log in!')
                    }

                    // set email to the jwt token
                    return {email}
                    
                } catch (error) {
                    throw new Error(error.message || 'Something went wrong')
                }
                

            }
        })
    ]
})
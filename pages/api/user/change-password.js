import {getSession} from 'next-auth/client'
import {connectDb} from '../../../helper/db'
import {comparePassword, hashPassword} from '../../../helper/hash'
import User from '../../../model/user'

const handler = async(req,res)=>{
  if(req.method != 'PATCH'){
    return;
  }

  const session = await getSession({req:req})
  console.log(session);
  if(!session){
    return res.status(401).send({message:'Not Authenticate'})
  }

  const {oldPassword, newPassword} = req.body
  

  try {
    await connectDb()
    const currentEmail = session.user.email
    
    const user = await User.findOne({email:currentEmail})
    console.log(user);

    if(!user){
      return res.status(404).send({message:'User not found'})
    }

    const isCorrect = await comparePassword(oldPassword,user.password)
    if(!isCorrect){
      return res.status(403).send({message:'Please check password again'})
    }

    const hashPw = await hashPassword(newPassword)
    const updatedUser = await User.findByIdAndUpdate(user._id, {password:hashPw},
       {new:true, runValidators:true})

       console.log(updatedUser);

       res.status(200).send({msg:'updated successfully'})
    
  } catch (error) {
    res.status(500).send({message:error.message || 'something went wrong'})
  }
}

export default handler
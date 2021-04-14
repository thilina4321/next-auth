import {hash, compare} from 'bcryptjs'

export const hashPassword = async(password)=>{
    const hashPw = await hash(password, 8)
    return hashPw
}

export const comparePassword = async(password, hashedPw)=>{
    const isCorrect = await compare(password, hashedPw)
    return isCorrect
}
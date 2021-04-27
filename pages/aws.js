import {useEffect, useState} from 'react'

const AwsPage = () => {
    const [msg, setMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // useEffect(()=>{
    //     fetch('https://o0m36amdsb.execute-api.us-east-1.amazonaws.com/dev/first', {
    //         method:"POST",
    //         headers:{'Content-Type':'application/json'},
    //         body:JSON.stringify({nams:'ss'})
    //     }).then((res)=>{
    //         return res.json()
    //     }).then((resData)=>{
    //         setMsg(resData.nams)
    //     })
    // }, [])

    useEffect(()=>{
        fetch('https://w3wb66b8eg.execute-api.us-east-1.amazonaws.com/dev/first')
        .then((res)=>{
            return res.json()
        })
        .then((resData)=>{
            console.log(resData);
            setMsg(resData)
        }).catch((e)=>console.log(e))
    },[])

    const onClickHandler = async()=>{
        setIsLoading(true)
        try {
            const post = await fetch('https://w3wb66b8eg.execute-api.us-east-1.amazonaws.com/dev/first',{
                body:JSON.stringify({data:'my Data'}),
                headers:{'Content-Type':'application/json'},
                method:'POST'
            })
            setIsLoading(false)
            
            const resData = await post.json()
            console.log(resData);
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
        

    }

    if(isLoading){
        return <p> Loading... </p>
    }
    
    return (
        <div>
            <h1> {msg} </h1>
            <button onClick={onClickHandler}> Btn </button>
        </div>
    )
}

export default AwsPage

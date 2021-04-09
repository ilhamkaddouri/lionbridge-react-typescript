import React, { useState , useRef} from 'react'

interface Person{
    firstName : string;
    lastName: string
}

interface Props {
    text  : string;
    ok?:boolean;
    i?:number //optional
    fn?:(bob:string)=> string;
    person: Person,
    handleChange?: (event:React.ChangeEventHandler<HTMLInputElement>)=>void
}

interface TextNode {
    text: string
}

export const  TextField :React.FC<Props> =({text, handleChange}) =>{
    const [count,setCount] = useState<number | null | TextNode>(5)
    const inputRef = useRef<HTMLInputElement>(null)
    const divRef = useRef<HTMLDivElement>(null)
    setCount(5) 
    return (
        <div ref={divRef}>
            <input ref={inputRef} />
        </div>
    )
}



import React, { useState } from 'react'
import s from './Header.module.css'
import { useStore } from '../../store/store';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
const Header = () => {
  const messages = useStore((state:any) => state.messages);
  const users = useStore((state:any) => state.users);
// console.log(messages);
  
dayjs.extend(relativeTime)
  const lastVisit = ()=>{
   return dayjs(messages[messages.length-1].date).fromNow()
  }
  let [marginAva, SetmarginAva] = useState('0');

  let classAva = function(index:number){ return {
    position: "absolute" as "absolute",
    left: (index-1)*19.95,
    top: "4px",
    border: "1.5px solid white",
    borderRadius: "150px",
    width: "26px",
    height: "26px",
   }}
  // let classAva2 = [ {"position": "absolute"}]
  return (

    <div className={s.container}>
      <ul className={s.avatars}>
          {users.map((message:any,index:number) => (
            index> 0 &&
            <div  key={message.id} >
              <img style={classAva(index)}  src={"src/assets/images/" +message.img} alt="" />
            </div>
          ))
          }
      </ul>

      <div className={s.headerTittle}>
        <h1>🦄 Team Unicorns</h1>
        <h2>{"last seen " + lastVisit()}</h2>
      </div>
      {/* <div ...</div> */}
      <svg className={s.svgMenu} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M1.5 9C2.32843 9 3 8.32843 3 7.5C3 6.67157 2.32843 6 1.5 6C0.671573 6 0 6.67157 0 7.5C0 8.32843 0.671573 9 1.5 9Z" fill="#666668"/>
        <path d="M8 9C8.82843 9 9.5 8.32843 9.5 7.5C9.5 6.67157 8.82843 6 8 6C7.17157 6 6.5 6.67157 6.5 7.5C6.5 8.32843 7.17157 9 8 9Z" fill="#666668"/>
        <path d="M16 7.5C16 8.32843 15.3284 9 14.5 9C13.6716 9 13 8.32843 13 7.5C13 6.67157 13.6716 6 14.5 6C15.3284 6 16 6.67157 16 7.5Z" fill="#666668"/>
      </svg>
    </div>
  )
}

export default Header

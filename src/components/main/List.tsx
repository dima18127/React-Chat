import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {useStore} from "../../store/store.js";
import s from "./List.module.css"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import  {IUsers}  from "../../models.tsx";
import dayjs from 'dayjs';


function List({changeMessage}:any) {
  // console.log(handleChange);
  
  const handleChange = (message:string)=>{
    changeMessage(message)
  }

  console.log("render chatList!");
  const chatRef = useRef<any>(null)
  const messages = useStore((state:any) => state.messages);
  const users = useStore((state:any) => state.users);
  const removeMessage = useStore((state:any) => state.removeMessage);
  
  // console.log(dates[dates.length - 1].date )
const  checkMessage = function(message:string, ) {
 if( message.includes('@')){
  let arr = message.split('')
  let target = arr.findIndex(item => item === "@");
  let matches = message.match(/@[\w-]+/g)
  let newStr = ''+matches
  let start = message.substring(0,target)
  let end ="";
  if (target + newStr!.length <= message.length) {
  end = message.substring(target + newStr!.length,message.length)
  }  else {
    end = "@"
  }

   return (<>
   <span>{start}</span>
    <a>{matches}</a>
   <span>{end}</span> 
   </>)
 }
  return message;
  
}

useEffect (()=>{
  chatRef.current.scrollTop = chatRef.current.scrollHeight},
[messages])

const getNewdate =  (index:number)=> {
  if (index === 0) {
    return dayjs(messages[index].date).format("M/DD/YYYY");
  }
  if (index > 1) {
  let prevDate = dayjs(messages[index -1 ].date).format("M/DD/YYYY");
  let newDate = dayjs(messages[index].date).format("M/DD/YYYY");
  if (newDate !== prevDate ) {
    console.log(messages, index);
    return newDate
  }
  else return null
}
}


return (
 <div className={s.container}
      ref={chatRef}>
    <>
      <ul>{messages.map((message:any, index:number) => (
        <div className={s.liContainer} key={message.id}>
        {getNewdate(index) && <h2 style={{textAlign:"center", marginTop:"17px"}}>{ getNewdate(index)  }</h2>}
        
        {message.userId == 'me' && 
          <li key={message.id} className={s.toRight}>
              <div  className={ s.messageContent}>
                <p>{checkMessage(message.message)} </p>
                    <div className={s.absolutRight}>

                      <button className={s.btn}
                        onClick={()=>handleChange(message)}>
                          <EditOutlined />
                      </button>
                      <button className={s.btn}
                        onClick={(e) => removeMessage(message.id)}>
                          <DeleteOutlined/>
                      </button>
                      <div className={s.time}>{dayjs(message.date).format('hh:mm A')}</div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
                      <path d="M11.7931 1.00041L4.63338 8.87892L1.142 5.5396" stroke="#81E299" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16.7401 0.999996L9.57997 8.87892L6.98385 6.42003" stroke="#81E299" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
              </div>
         </li>
        }
        {message.userId !== 'me' &&
          <li key={message.id}>
            <div className={s.messageWrap}>
              <div className={users.find((user:IUsers) => user.userId === message.userId).online ? s.greenCircle : ''}>
                <img  src={"src/assets/images/"+users.find((user:IUsers) => user.userId === message.userId).img} alt="" />
              </div> 
              <div  className={ s.messageContent}>
                {/* <div className={s.flex}> */}
                  <p className={s.userName}>{ users.find((user:IUsers) => user.userId === message.userId).name } 
                    <span className={s.userRole}>{users.find((user:IUsers) => user.userId === message.userId).role}</span>
                  </p>
                {/* </div> */}
                <p>{checkMessage(message.message)} </p>
                <div className={s.absolutRight}>
                  <div className={s.time}>{dayjs(message.date).format('hh:mm A')}</div>
                </div>
              </div>
            </div>
          </li>
        }
        
         </div>
        ))}
      </ul>

    </>
</div>
);
}
export default List;
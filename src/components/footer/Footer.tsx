import React, { ReactEventHandler,MouseEvent,KeyboardEvent, useState, useLayoutEffect, useCallback, useRef, useEffect } from 'react';
import {useStore} from "../../store/store.js";
import s from './Footer.module.css'
import  ArrowPush  from 'src/assets/images/arrow-push.svg';
import { SmileOutlined } from '@ant-design/icons';
import Dog from 'src/assets/images/dog.svg'


const Footer = ({editedMessage, setMessage}) => {
console.log(editedMessage);

  
  const addMessages = useStore((state) => state.addMessages); 
  const editeMessage = useStore((state) => state.editeMessage); 
  // const removeMessage = useStore((state:any) => state.removeMessage);

  const messages = useStore((state:any) => state.messages);
  const [InputValue, SetInputValue] = useState('');
  const [textareaheight, setTextareaheight] = useState(1); 
  const [CountMessagesBot, setCountMessagesBot] = useState(0); 
  
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(()=>{
    editedMessage ? SetInputValue(editedMessage.message) : null;
    // setMessage(null)
  },[editedMessage])
  console.log(editedMessage);
  
  useEffect(()=>{
    inputRef.current?.focus();
  },[messages])
  console.log("render footer");

  const addMessage = (e: React.KeyboardEvent<HTMLTextAreaElement> | any ) => {
    
  if ((e.key === "Enter" && e.shiftKey !== true)  || e.type === "click"){
  if (InputValue.trim() !== ''){
    e.preventDefault();
    let  dateUser = new Date().toString()
    editedMessage ? (editeMessage(editedMessage.id, InputValue ), setMessage(0) ): addMessages({ message: InputValue, date: dateUser}, CountMessagesBot);
    // debugger;
    SetInputValue('');
    setTextareaheight(1);
    setCountMessagesBot(CountMessagesBot+1)
  }

  }
  if (e.key === "Enter" && e.shiftKey){
      const height = e.target.scrollHeight; 
      const rowHeight = 20; 
      const trows = Math.ceil(height / rowHeight)+1; 
      if (trows | textareaheight) { 
        setTextareaheight(trows); 
        SetInputValue(e.target.value)
      } 
    }
  };
  let handleChange = useCallback((event:React.ChangeEvent<HTMLTextAreaElement>)=>{
    if (event.target.value !== " ") {
    SetInputValue(event.target.value)
}
  },[])


  return (
    <div className={s.container}>
      <SmileOutlined className={s.smile}/>
      <textarea 
      placeholder='Start typing...'
      value={InputValue} 
      rows = {textareaheight}
      ref ={inputRef}
      onChange={event => {handleChange(event)}}
      onKeyDown={e => {addMessage(e)}}
      />
      <img  src={Dog} className={s.dogIcon} alt="" />
      <button className={s.btn} onClick={(e) =>{addMessage(e)}}>
      <img  src={ArrowPush} alt="" />
      </button>
    </div>
  );
};

export default Footer;

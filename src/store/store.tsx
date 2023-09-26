import create from "zustand";
import { devtools } from "zustand/middleware";
import { persist} from 'zustand/middleware'
import { IDate, IMessage, IMessagesStore } from "../models";

const myMiddlewares = (f:any) => devtools((f)
  // persist(f,{ name: 'bearStore' })
  )
let store = myMiddlewares((set:any) => ({
  messages: [
    { id: 1, name: "me", message: "Hi team 👋", date: "2020-08-20 11:31", userId: 'me',  },
    { id: 2, name: "me", message: "Anyone on for lunch today",date: "2020-08-20 11:31",userId: 'me', },
    { id: 3, name: "Jav", message: "I’m down! Any ideas??" ,date: "2020-08-20 11:35",userId: 2,},
    { id: 4, name: "me", message: "I am down for whatever!", date: "2020-08-20 11:36", userId: 'me', },
    { id: 5, name: "Aubrey",message: "I was thinking the cafe downtown", date: "2020-08-20 11:45",userId: 3, },
    { id: 6, name: "Aubrey",message: "But limited vegan options @Janet!", date: "2020-08-20 11:46", userId: 3,},
    { id: 7, name: "me",message: "Agreed", date: "2020-08-20 11:52", userId: 'me',},
    { id: 8, name: "Janet",message: "That works- I was actually planning to get  a smoothie anyways 👍", date: "2020-08-20 12:03", userId: 4,},
    { id: 9, name: "Janet",message: "On for 12:30 PM then ?", date: "2020-08-20 12:04",userId: 5, },
  ],
  users: [
    { userId: 'me', name: "me",role: "Developer", img:"", },
    { userId: 5, name: "Janet",role: "Product" , img:"avatar-yellow.svg" , online: true},
    { userId: 4, name: "Janet",role: "Engineering" , img:"avatar.svg" ,},
    { userId: 3, name: "Aubrey",role: "Product", img:"avatar-blue.svg",  online: true},
    { userId: 2, name: "Jav",  role: "Engineering", img:"avatar-black.svg",},
  ],
  botmessages: ["hello man! I'm a bot and i'm online (green circle near my avatar) Let me describe my app? Just send here any message" ,"This is a chat which have a lot of logic,correct time, uniq users and so on." ,"You can send here a big massage and it save new lines!","also you can press 'shift + enter' for next line and Size in input area will greater", "That is all now! Thanks for your time"  ],

  addMessages: (message:IMessage ,count:number) =>

    set((state: IMessagesStore) => ({
      
      messages: [
        
        ...state.messages,
        { message: message.message, name: "me", id:  message.date, date: message.date, userId: "me" },
        count < state.botmessages.length ? { message: state.botmessages[count], name: "Janet", id: message.date + "botMessage", date: message.date, userId: 5 }
        :{ message: state.botmessages[state.botmessages.length-1], name: "Janet", id: message.date + "botMessage", date: message.date, userId: 5 },
      ],
    })),

  removeMessage: (id:number) =>
    set((state: IMessagesStore) => ({
      messages: state.messages.filter((message) => message.id !== id),
    })),

  editeMessage: ( id:number , editMessage:string) =>
    set((state: IMessagesStore) => ({
      messages: state.messages.map( item => item.id === id ? {...item, message: editMessage} : item)
    })),
}));
// store = 
export const useStore = create<IMessagesStore>(store);

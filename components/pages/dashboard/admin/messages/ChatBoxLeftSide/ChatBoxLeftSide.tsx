import React from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatLists from './ChatLists/ChatLists';

const ChatBoxLeftSide = ({setloading,
    setmsg,
    setuserIdforchat,
    socket,
     setmembers,
     setopenConversation,
     setchatid,
     setavatar,
     setname,
     setisGroupChat
    }:{setloading:any;
        setmsg:any;
        setuserIdforchat:any;
        socket:any;
        setmembers:any;
        setisGroupChat:any;
        setname:any;
        setopenConversation:Function;setchatid:any;
        setavatar:any;
    }) => {
    return (
        <div>
            <ChatHeader socket={socket}/>
            <ChatLists setloading={setloading}
             setmsg={setmsg}
              setuserIdforchat={setuserIdforchat}
               socket={socket}
                setmembers={setmembers} 
                setopenConversation={setopenConversation} 
                setchatid={setchatid}
                 setavatar={setavatar} 
                 setname={setname}
                  setisGroupChat={setisGroupChat}
              />
        </div>
    );
};

export default ChatBoxLeftSide;
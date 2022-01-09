import '../../CSS/Conversation.css'

export default function NewConversation({conversation}) {
    return(     
        <>   
        {conversation?.label && <div className="conversation">
            <span className="conversationName">{conversation?.label}</span>
        </div>}</>
        
    );
}
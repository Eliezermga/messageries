(function(){

    const app = document.querySelector(".app");//la variable app prend la valeur de class app du fichier index grace à l'attribut document.querySelector
    const socket = io();

    let uname;//cette variable sera utilisé en bas 

    app.querySelector(".join-screen #join-user").addEventListener("click",function(){
        let username = app.querySelector(".join-screen #username").value;//la variable username reçoit la valeur de l'id username
        if(username.length == 0){//cette condition s'applique si la longuer du champ du nom de l'utilisateur est 0 au premier ecran
            return;
        }
        socket.emit("newuser",username);
        uname = username;//la variable uname reçoit à son tour la valeur de username
        app.querySelector(".join-screen").classList.remove("active");//on supprime l'attribut active qui se trouve à la classe join-screen
        app.querySelector(".chat-screen").classList.add("active");//on le rajoute a la class chat-screen pour cette dernière puisse être affichée
    });

    app.querySelector(".chat-screen #send-message").addEventListener("click",function(){
        let message = app.querySelector(".chat-screen #message-input").value;
        if(message.length == 0){
            return;
        }
        renderMessage("my",{
            username:uname,
            text:message
        });
        socket.emit("chat",{
            username:uname,
            text:message
        });
        app.querySelector(".chat-screen #message-input").value = "";        
    });

    app.querySelector(".chat-screen #exit-chat").addEventListener("click",function(){
        socket.emit("exituser",uname);
        window.location.href = window.location.href;
    });

    socket.on("update",function(update){
        renderMessage("update",update);
    });
    
    socket.on("chat",function(message){
        renderMessage("other",message);
    });

    function renderMessage(type,message){
        let messageContainer = app.querySelector(".chat-screen .messages");
        if(type == "my"){
            let el = document.createElement("div");
            el.setAttribute("class","message my-message");
            el.innerHTML = `
            <div>
                <div class="name">Vous</div>
                <div class="text">${message.text}</div>
            </div>
            `;
            messageContainer.appendChild(el); 
        }else if(type == "other"){
            let el = document.createElement("div");
            el.setAttribute("class","message other-message");
            el.innerHTML = `
            <div>
                <div class="name">${message.username}</div>
                <div class="text">${message.text}</div>
            </div>
            `;
            messageContainer.appendChild(el); 
        }else if(type == "update"){
            let el = document.createElement("div");
            el.setAttribute("class","update");
            el.innerText = message;
            messageContainer.appendChild(el); 
        }
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

})();
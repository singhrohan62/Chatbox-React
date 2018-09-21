import React, { Component } from 'react';
import logo from './logo.svg';
import socketIOClient from 'socket.io-client';
import './App.css';

const socket = socketIOClient.connect("http://10.30.81.13:4001")

class App extends Component {

  constructor()
  {
    super();
    this.state = {
      isLoggedIn: false,
      username: '',
      users: [],
      socketID:'',
      messageSent:'',
      usermsgs:[],
    }

    socket.on('Users Connected', (users,id) => {
      console.log("users connected: ",users)
      this.setState({ users: users })
      this.setState({socketID:id})
    })

    socket.on('Chat Message Show', (message, user) => {
      console.log(user,": ",message);
      this.addNewMessage(message);
      console.log(this.state.usermsgs);
    })
  }

  sendUsername = () => {
    console.log(this.state.username);
    this.setState({isLoggedIn: true})
    socket.emit('Login User', this.state.username);
  }

  addNewMessage = (message) => {
    let newArray = this.state.usermsgs.slice();
    newArray.push(message);
    this.setState({usermsgs:newArray});
    this.msgInput.value ='';
  }

  sendMessage = () => {
    console.log(this.msgInput.value);
    socket.emit('Chat Message', this.state.messageSent,this.state.username);
  }

  renderLoginBox = () => {
    return (
        <div className="App">
          <h2>LoginBoxRendering</h2>
            <input type="text" placeholder="Eg: Hajmola" onChange={(event) => this.setState({username: event.target.value})} value={this.state.username}/>
            <button onClick={() => this.sendUsername()}>Go!</button>
        </div>
      )
  }

  renderChatPage = () => {
    return (
      <div className="App"><h2>RenderingChatWindow</h2>
          <h4>Welcome {this.state.username}</h4>
          <h5>Connected USers: {this.state.users} </h5>
          
            <input type="text" ref={(input) => {this.msgInput=input;}} onChange={(event) => this.setState({messageSent: event.target.value})} value={this.state.messageSent}/>
            <button onClick={() => this.sendMessage()}>Send</button>
          <h5>Chats</h5>
          <h5>{this.state.usermsgs}</h5>
      </div>
    )
  }


  render() {

    if(this.state.isLoggedIn)
      return this.renderChatPage();
    else
      return this.renderLoginBox();
  }
}

export default App;

import React from 'react';
import bacteria from './images/bacteria.png';

class Formulaire extends React.Component{

    constructor(props){
        super(props)
    }
   
    state = { 
        fullName:null,
        fullName1:null,
        fullName2:null,
        fullName3:null,
        send1:false,
        send2:false,
        send3:false,
        send4:false,
        cssClass : "champs",
        players:null,
        numberOfPlayers:null
    }

    componentDidMount(){
        this.getAllPlayers();
    }

    //permet de lancer une requete 'post' et entrer une valeur dans la base de données . 
    async postData(value) {
        if(this.state.numberOfPlayers < 4){
            if(value != null && value!=""){
                try {
                    let result = await fetch('http://localhost:8080/addplayer', {
                    method:'post',
                    headers:{
                        'Accept':'application/json',
                        'content-type':'application/json',
                    },
                    
                    body:JSON.stringify({name:value})
                    });
                    console.log(result)
                    this.getAllPlayers();
                } catch(e){
                    console.log(e)
                }
            }
            else{
                alert("Error");
            }
        }
        else{
            alert("Cannot add more than 4 players");
        }
    } 

    disableSendButtons(){
        if(this.state.numberOfPlayers >= 4){
            this.setState({send1: true, send2:true, send3:true, send4:true})
        }
    }

    async getAllPlayers() {
            try {
                let result = await fetch('http://localhost:8080/players');
                let data = await result.json()
                this.setState({players:data,numberOfPlayers:data.length});
                await this.disableSendButtons();
                console.log(data)
            } catch(e){
                console.log(e)
            }
    } 

/////////////////////////////////////////////////////////////////////////////////


    //permet d'entrer un nom et l'ajouter dans la base de données en intéragissant avec la requête 'post' 
    handleChange = event=>{
        console.log(event.target.value)
    }

    handleInputChange=(event) => {
        event.preventDefault()
        this.setState({[event.target.name]:event.target.value})
    }
    /////////////////////////////////////////////////////////////



    //permet de lancer une requete 'get' qui permettra d'initialiser une partie en prenant en compte la requete 'post' 
    async getData() {
        if(this.state.numberOfPlayers > 2 && this.state.numberOfPlayers <= 4){
            try {
                let result = await fetch('http://localhost:8080/initializegame') 
                let data = await result.json()
                await this.props.updatephase();
                console.log(data);
            }
            catch(e){
                console.log(e)
            }
        }
        else{
            alert("There's "+this.state.numberOfPlayers+" players the game cannot start");
        }
        
    } 

////////////////////////////////////////////////////////////////////////////////////////////////////


    render(){ 
       
        return ( 
     
        <div className ={this.state.cssClass}>

<div className ="border">


<div className="players">    

<div className ="ja">
    <h3>Player 1</h3>
    <div>
    <p><input className="valeur"type ="text" placeholder ="your name " value={this.state.fullName} name = "fullName" onChange = {this.handleInputChange}/></p>
    <p><button className="add" disabled={this.state.send4} onClick={()=>{this.postData(this.state.fullName3); this.setState({send4:true})}}>Send</button></p>
    </div> 
</div>


<div className ="jb">
    <h3>Player 2</h3>
    <div>
    <p><input className="valeurb"type ="text" placeholder ="your name " value={this.state.fullName1} name = "fullName1" onChange = {this.handleInputChange}/></p>
    <p><button className="add" disabled={this.state.send4} onClick={()=>{this.postData(this.state.fullName3); this.setState({send4:true})}}>Send</button></p>
    </div> 
</div>


<div className ="jc">
    <h3>Player 3</h3>
    <div onSubmit={this.handleSubmit}>
    <p><input className="valeurc" type ="text" placeholder ="your name " value={this.state.fullName2} name = "fullName2" onChange = {this.handleInputChange}/></p>
    <p><button className="add" disabled={this.state.send4} onClick={()=>{this.postData(this.state.fullName3); this.setState({send4:true})}}>Send</button></p>
    </div> 
</div>


<div className ="jd">
    <h3>Player 4</h3>
    <div onSubmit={this.handleSubmit}>
    <p><input className="valeurd" type ="text" placeholder ="your name " value={this.state.fullName3} name = "fullName3" onChange = {this.handleInputChange}/></p>
    <p><button className="add" disabled={this.state.send4} onClick={()=>{this.postData(this.state.fullName3); this.setState({send4:true})}}>Send</button></p>
    </div> 
</div>



<div className="initialize">
    <button classNameonClick={()=> { this.getData()}}>Start game with ({this.state.numberOfPlayers}) players</button>
</div>


</div>



</div>
  

        </div>

        )
    }
}
  
export default Formulaire;
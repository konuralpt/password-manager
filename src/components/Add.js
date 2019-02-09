import React, {Component} from "react";
import {View,AsyncStorage,TextInput} from "react-native";
import { Container, Header, Content, Form, Item, Input, Label,Textarea,Button,Text } from 'native-base';


export default class extends Component{
  constructor(props) {
    super(props);
    state = {
      title: '',
      username   : '',
      password: '',
      description: '',
    }
  };

  saveToStorage = async () => {
    const details = {
      title: this.state.title,
      username : this.state.username,
      password: this.state.password,
      description: this.state.description,
    };
    const existing = await AsyncStorage.getItem(details.title);
    let newDetails = JSON.parse(existing);

    if( !newDetails ){
       newDetails = [];
       newDetails.push(details);
       await AsyncStorage.setItem(details.title, JSON.stringify(newDetails))
       .then(() => {
         alert("Saved");
       })
       .catch(() => {
         alert("Error while saving");
       })
     }else{
       alert(details.title + " already exists!");
     }
}

    render(){
        return(
          <Container>
            <Content padder>
              <Form>
                <Item floatingLabel style={{ marginBottom: 30 }}>
                  <Label>Title</Label>
                  <Input onChangeText={(title) => this.setState({title})} />
                </Item>
                <Item floatingLabel>
                  <Label>Username / E-mail</Label>
                  <Input onChangeText={(username) => this.setState({username})} />
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input onChangeText= {(password) => this.setState({password})} />
                </Item>

                <Textarea rowSpan={5}
                 bordered
                 placeholder="Description"
                 style={{ marginTop: 60 }}
                 onChangeText= {(description) => this.setState({description})}
                 />

              </Form>
              <Button block
              bordered
              style={{ marginTop: 50 }}
              onPress={() => this.saveToStorage()}
              >
                <Text>Add</Text>
              </Button>
            </Content>
          </Container>
        )
    }
}
import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import { useState, useEffect} from 'react';
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import { Storage } from 'aws-amplify';
function App({ signOut }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }
  const uploadFile = async (file) => {
    try {
      await Storage.put(file.name, file, {
        level: "private",
        metadata: {key: String(Math.random())}, //To prevent pulling an old outdated file
        contentType: "audio/mp3", // contentType is optional
      });
      console.log("Success!")
      }
     catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  return (
    <View className="App">
      <Card>
        <Image src={logo} className="App-logo" alt="logo" />
        <Heading level={1}>We now have Auth!</Heading>
      </Card>
      <label for="file-upload" class="custom-file-upload">
        Upload Audio File Here
      </label>
      <input id="file-upload" type="file" onChange={handleFileInput}/>
      <br></br>
      <button onClick={()=>{
                    uploadFile(selectedFile)
                  }}>Translate!</button>
      <br></br>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
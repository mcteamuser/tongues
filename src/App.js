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
import AWS from 'aws-sdk'; //Needed to import this to work properly

const s3 = new AWS.S3();

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
        <Heading level={1}>Convert Your Audio Files Into Different Languages!</Heading>
      </Card>
      <label for="file-upload" class="custom-file-upload">
        Upload Audio File Here
      </label>
      <br></br>
      <input id="file-upload" type="file" onChange={handleFileInput}/>
      <br></br>
      <label for="language">Choose an output language:</label>
        <select name="language" id="language">
          <option value="arabic">Arabic</option>
          <option value="mandarin">Chinese, Mandarin</option>
          <option value="danish">Danish</option>
          <option value="dutch">Dutch</option>
        </select>
      <button onClick={()=>{
                    uploadFile(selectedFile)
                  }}>Translate!</button>
      <br></br>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
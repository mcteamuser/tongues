import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import axios from 'axios';
import { useState, useEffect} from 'react';
import {
  withAuthenticator,
  useAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import { Storage, Auth} from 'aws-amplify';
import AWS from 'aws-sdk'; //Needed to import this to work properly
import './style.css'

const s3 = new AWS.S3();

function App({ signOut }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [userFileList, setUserFileList] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("Pending User - Hit Translate When Ready")
  const [showFiles, setShowFiles] = useState(false)
  const [checkedProp, setCheckedProp] = useState(false)
  const [value, setValue] = useState("Zeina");
  const { user } = useAuthenticator();
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }
  const uploadFile = async (file) => {
    // Do send-ahead API Call to Store Email, Filename, and Language
    var userEmail = await getEmail()
    //Set the loading animation
    setUploadStatus("Uploading... Please Wait...")
    try {
      await Storage.put(file.name, file, {
        level: "private",
        metadata: {email: String(userEmail), language: value}, //To prevent pulling an old outdated file
        contentType: "audio/mp3", // contentType is optional
      });
      //Remove the loading animation
      setUploadStatus("Upload Complete! Sending To Translator, check back later.")
      console.log("Success!")
      }
     catch (error) {
      setUploadStatus("Error Uploading file :(")
      console.log("Error uploading file: ", error);
    }
  }
  
  const handleChange=(e)=>{
    setValue(e.target.value);
  }
  async function GetFiles(){
    if(showFiles){
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken
      var userEmail = await getEmail()
      const payload = {
        
          email: userEmail
        
        ,
        headers: {
          Authorization: token
        }
      };
      let res = await axios.post("https://1thvdqr783.execute-api.us-east-1.amazonaws.com/default/tonguesFileCheck", payload); 
      var fileList = JSON.parse(res.data.body)
      setUserFileList(fileList)
      }
    else {
      return null
    }
  }
  function ShowFiles(){
    if(userFileList == null){
      //do nothing
    }
    else{
      var filesToDisplay = Object.values(userFileList)

    return(
      <>
      <ul>
        <li><a href={filesToDisplay[0][1]}>{filesToDisplay[0][0]}</a></li>
        <li><a href={filesToDisplay[1][1]}>{filesToDisplay[1][0]}</a></li>
        <li><a href={filesToDisplay[2][1]}>{filesToDisplay[2][0]}</a></li>
        <li><a href={filesToDisplay[3][1]}>{filesToDisplay[3][0]}</a></li>
      </ul>
      <meta charSet="utf-8"/>
      <div style={
        {
          width:"250px",
          border:"1px solid black",
          overflow: "auto",
          float: "left",
          marginRight: "100px"
        }
      }>
        {filesToDisplay[4][0]}
      </div>
      <div style={
        {
          width:"250px",
          border:"1px solid black",
          overflow: "auto"
        }
      }>
        {filesToDisplay[5][0]}
      </div>
      </>
    )
    }
  }
  async function getEmail(){
    const user = await Auth.currentAuthenticatedUser();
    return user.attributes.email
  }
  function TranslateButton(){
    return(
      <div class='button'>
  <input id='button' type='checkbox'
    checked={checkedProp}
    onClick={()=>{
      uploadFile(selectedFile)
      setCheckedProp(!checkedProp)
    }}></input>
  <label for='button'>
    <div class='button_inner q'>
      <i class='l ion-log-in'></i>
      <span class='t'>Translate</span>
      <span>
        <i class='tick ion-checkmark-round'></i>
      </span>
      <div class='b_l_quad'>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
        <div class='button_spots'></div>
      </div>
    </div>
  </label>
</div>

    )
  }
  return (
    //<Image src={logo} className="App-logo" alt="logo" />
    <View className="App">
      <Image src="https://sphoenix-domain-media.s3.amazonaws.com/logo/SOUND_LOGO.jpg" className="App-logo" alt="logo" />
      <Card>
        <Heading level={1}>Convert Your Audio Files Into Different Languages!</Heading>
      </Card>
      <label for="file-upload" class="custom-file-upload">
        Upload Audio File Here
      </label>
      <br></br>
      <input 
        id="file-upload" 
        type="file" 
        onChange={handleFileInput}
        style={{display:"block"}}
      />
      <>Upload Status: {uploadStatus}</>
      <br></br>
      <label for="language">Choose an output language:</label>
        <select name="language" id="language" value={value} onChange={handleChange}>
          <option value="Zeina">Arabic</option>
          <option value="Zhiyu">Chinese, Mandarin</option>
          <option value="Naja">Danish</option>
          <option value="Lotte">Dutch</option>
          <option value="Mia">Spanish - Mexico</option>
          <option value="Kendra">English</option>
          <option value="Seoyeon">Korean</option>
        </select>
      <br></br>
      <TranslateButton></TranslateButton>
      <br></br>
      <Button onClick={
        function(){
          console.log("Clicked!")
          setCheckedProp(false)
          setShowFiles(!showFiles)
          GetFiles()
        }
        }>Refresh Transcripted Files</Button>
      <br></br>
      <ShowFiles></ShowFiles>
      <br></br>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
/*
<>Upload Status: {uploadStatus}</>
<Button onClick={()=>{
                    uploadFile(selectedFile)
                  }}>Translate!</Button>
*/
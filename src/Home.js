// load theme styles with webpack
import React, { useRef, useEffect, useState } from 'react';//Component
import ReactDOM from 'react-dom';
import IconButton from '@material-ui/core/IconButton';//Input, Button,
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';//, VoiceOverOffIcon
import VoiceOverOffIcon from '@material-ui/icons/VoiceOverOff';//, LaunchIcon 
import LaunchIcon from '@material-ui/icons/Launch';//, DoneIcon   
import DoneIcon from '@material-ui/icons/Done';//, DoneIcon   
import TextFieldsIcon from '@material-ui/icons/TextFields';//, TextFieldsIcon  
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';//Alert
import { Helmet } from "react-helmet";
// import { message, Button, Space } from 'antd';
//import 'antd/dist/antd.css';
//import GitHubIcon from '@material-ui/icons/GitHub'; IconButton from marterial core if needed
import "./Home.css"

import { TrixEditor } from "react-trix";
import "./Editortwo.css"

//  import ReactMediumEditor from './Editor';
//  require('medium-editor/dist/css/medium-editor.css');
//  require('medium-editor/dist/css/themes/default.css');

let mergeTags = [{
    trigger: "@",
    tags: [
        { name: "Dominic St-Pierre", tag: "@dominic" },
        { name: "John Doe", tag: "@john" }
    ]
}, {
    trigger: "{",
    tags: [
        { name: "First name", tag: "{{ .FirstName }}" },
        { name: "Last name", tag: "{{ .LastName }}" }
    ]
}]
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let speechRecognizer = new SpeechRecognition();
speechRecognizer.maxAlternatives = 100;
speechRecognizer.continuous = false;
var userLang = navigator.language || navigator.userLanguage; console.log(userLang); 
const supportedlang=["en-AU","en-CA","en-IN","en-NZ","en-ZA","en-GB","en-US"]
if(supportedlang.includes(userLang)===false){
console.log("found non supported language");
userLang="en-US";
}
const Home = () => {
    const mounted = useRef(); const speechmounted = useRef()
    //const [transcripts, setTranscripts] = useState("");
    // const [finaltranscripts, setfinalTranscripts] = useState("");
    // const [interimtranscripts, setinterimTranscripts] = useState("");
    const [currCursorPos, setcurrCursorPos] = useState([27, 27]);//cursor position
    const [speech, setSpeech] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState({});
    const [tooltipPos, setTooltipPos] = useState(false);
    const [imgBtnClicked, setimgBtnClicked] = useState(false);//handleImgURLInput
    const [headingBtnClicked, setheadingBtnClicked] = useState(false);//handleImgURLInput
    const [boldBtnClicked, setboldBtnClicked] = useState(false);//handleImgURLInput
    const [imgInputURL, setImgInputURL] = useState("");//handleImgURLInput


    const [KeyPhrase, setKeyPhrase] = useState({
        questionMark: "question mark",
        period: "end of sentence",
        comma:"add a comma",
        newline:"new line",
        quote:"make it a quote",
        code:"code block",
        bold:"bold",
        italic:"italic",
        underline:"underline",
        H2:"heading"
      });

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal, open } = state;
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;

        } else {

            var element = document.querySelector("trix-editor");
            //console.log(element.editor.getSelectedRange(),currCursorPos)
            element.editor.setSelectedRange(currCursorPos);
        }
    }, [currCursorPos]);

    useEffect(() => {
        if (!speechmounted.current) {
            // do componentDidMount logic
            speechmounted.current = true;

        } else {
            // if(speech===false){
            //     let result=document.getElementById('interimTranscripts');
            //     result.innerHTML="Speak your Essay!"
            // }
            if(speech){
                Speech();
                console.log('starting speech',speech)
            }else{
                speechRecognizer.stop();
                console.log('stopping speech',speech)
            }
        }
    }, [speech]);
    useEffect(() => {
        const onimgButtonClick = (event) =>{
            console.log("scrolling", event);
            if(imgBtnClicked){
            setimgBtnClicked(false);
            document.getElementById('imagebutton').classList.remove('trix-active');
            }else{
            setimgBtnClicked(true);
            document.getElementById('imagebutton').classList.add('trix-active');
            }
        }
        const onheadingButtonClick = (event) =>{
            console.log("scrolling", event);
            if(headingBtnClicked){
            setheadingBtnClicked(false);
            document.getElementById('headingbutton').classList.remove('trix-active');
            }else{
            setheadingBtnClicked(true);
            document.getElementById('headingbutton').classList.add('trix-active');
            }
        }
        // const onboldButtonClick = (event) =>{
        //     //document.getElementById('boldbutton').click()
        //     console.log(boldBtnClicked);
        //     if(boldBtnClicked){
        //     setboldBtnClicked(false);
        //     document.getElementById('boldbutton').classList.remove('trix-active');
        //     }else{
        //     setboldBtnClicked(true);
        //     document.getElementById('boldbutton').classList.add('trix-active');
        //     }
        // }





          
        document.getElementById('imagebutton').addEventListener('click', onimgButtonClick);
        //document.getElementById('boldbutton').addEventListener('click', onboldButtonClick);
        document.getElementById('headingbutton').addEventListener('click', onheadingButtonClick);
        
        return () => {
            document.getElementById('imagebutton').removeEventListener('click', onimgButtonClick);
            //document.getElementById('boldbutton').removeEventListener('click', onboldButtonClick);
        document.getElementById('headingbutton').removeEventListener('click', onheadingButtonClick);
        }
      }, [//boldBtnClicked
        ,headingBtnClicked,imgBtnClicked]);


      function Speechbtn(){
        //console.log('onlick',speech)
          if(speech){
              setSpeech(false);
              speechRecognizer.stop()
          }else{
              setSpeech(true);//Speech();
          }
      }
    function Speech() {
        var element = document.querySelector("trix-editor");
        let result = document.getElementById('interimTranscripts');
        // element.editor.insertString("Hello")
        //console.log(element.editor.getSelectedRange())
        //let curr = speech;
        //setSpeech(!curr);
        //console.log(speech);



        

        //speechRecognizer.stop();
        
        if (speech) {
            //console.log('speech in the function',speech)
            // speechRecognizer.continuous = true;
            // speechRecognizer.interimResults = true;
            // speechRecognizer.lang = 'en-IN';
            // speechRecognizer.start();
            var recognizing=false;
            //if ('webkitSpeechRecognition' in window) {
                    speechRecognizer.continuous = true;
                    speechRecognizer.interimResults = true;
                    speechRecognizer.lang = "en-IN";
        
                   if(recognizing===false) speechRecognizer.start();
                    speechRecognizer.onstart = function () {
                        recognizing = true;
                    };
            let finalTranscripts = '';
            speechRecognizer.onresult = function (event) {
                var interimTranscripts = '';
                // console.log(event)
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    var transcript = event.results[i][0].transcript;
                    // transcript.replace("\n", "<br>");

                    if(transcript.includes(KeyPhrase.questionMark)){
                        //document.getElementById('boldbutton').click()
                        //element.editor.activateAttribute("bold");
                        // transcript= transcript.replace(`${KeyPhrase.questionMark}`,'?');
                        let re = new RegExp(`\\b${ KeyPhrase.questionMark}\\b`, 'gi');
                        transcript= transcript.replace(re, "?");
                    } if(transcript.includes(KeyPhrase.comma)){
                        // transcript= transcript.replace(`${KeyPhrase.comma}`,',');
                        let re = new RegExp(`\\b${KeyPhrase.comma}\\b`, 'gi');
                        transcript= transcript.replace(re, ",");
                    }
                    if(transcript.includes(KeyPhrase.period)){
                        //transcript= transcript.replace(`${KeyPhrase.period}`,'.\n');
                        let re = new RegExp(`\\b${KeyPhrase.period}\\b`, 'gi');
                        transcript= transcript.replace(re, ". \n");
                    }
                    

                    if (event.results[i].isFinal) {

                        if(transcript.includes(KeyPhrase.H2)){
                            //transcript= transcript.replace(`${KeyPhrase.period}`,'.\n');
                            let re = new RegExp(`\\b${KeyPhrase.H2}\\b`, 'gi');
                            transcript= transcript.replace(re, "");
                            if(document.getElementById('headingbutton').classList.contains('trix-active')){
                                element.editor.deactivateAttribute("heading2");
                            }else{
                            element.editor.activateAttribute("heading2");
                            }
                        }
                        if(transcript.includes(KeyPhrase.bold)){
                            //transcript= transcript.replace(`${KeyPhrase.period}`,'.\n');
                            let re = new RegExp(`\\b${KeyPhrase.bold}\\b`, 'gi');
                            transcript= transcript.replace(re, "");
                            if(document.getElementById('boldbutton').classList.contains('trix-active')){
                                element.editor.deactivateAttribute("bold");
                            }else{
                            element.editor.activateAttribute("bold");
                            }
                        }
                        if(transcript.includes(KeyPhrase.quote)){
                            //transcript= transcript.replace(`${KeyPhrase.period}`,'.\n');
                            let re = new RegExp(`\\b${KeyPhrase.quote}\\b`, 'gi');
                            transcript= transcript.replace(re, "");
                            if(document.getElementById('quotebutton').classList.contains('trix-active')){
                                element.editor.deactivateAttribute("quote");
                            }else{
                            element.editor.activateAttribute("quote");
                            }
                        }
                        if(transcript.includes(KeyPhrase.code)){
                            //transcript= transcript.replace(`${KeyPhrase.period}`,'.\n');
                            let re = new RegExp(`\\b${KeyPhrase.code}\\b`, 'gi');
                            transcript= transcript.replace(re, "");
                            if(document.getElementById('codebutton').classList.contains('trix-active')){
                                element.editor.deactivateAttribute("code");
                            }else{
                            element.editor.activateAttribute("code");
                            }
                        }
                        if(transcript.includes(KeyPhrase.newline)){
                            // transcript= transcript.replace(`${KeyPhrase.newline}`,'\n');
                            let re = new RegExp(`\\b${KeyPhrase.newline}\\b`, 'gi');
                            transcript= transcript.replace(re, '\n');
                            // element.editor.insertHTML('<br>')
                            //element.editor.setSelectedRange([element.editor.getSelectedRange()[0]+1,element.editor.getSelectedRange()[1]+1])
                            //console.log(transcript)
                        }
                        //selectedDiv.innerHTML=""
                        finalTranscripts += transcript;
                        finalTranscripts=finalTranscripts.trim()
                        transcript=transcript.trim()
                        // browser === "EdgeChrome" ?
                        //     finalTranscripts = finalTranscripts + " "
                        //     : finalTranscripts = finalTranscripts;
                        let selectedrange = element.editor.getSelectedRange()
                        //console.log(currCursorPos,element.editor.getSelectedRange(),finalTranscripts.length);





                        
                        
                        element.editor.insertString(transcript);



                        //console.log(finalTranscripts);
                        setcurrCursorPos([selectedrange[0] + transcript.length,
                        selectedrange[0] + transcript.length]);
                        //result.innerHTML=`  `
                    } else {
                        interimTranscripts += transcript;//selectedDiv.innerHTML

                        //console.log(event.results)
                        //console.log(finalTranscripts + '<span style="color: #999">' + interimTranscripts + '</span>');
                        // element.editor.recordUndoEntry("Insert Text");
                        // element.editor.insertHTML(finalTranscripts + '<em style="color: #999">' + interimTranscripts + '</em>');

                        // setTimeout(() => {
                        //     element.editor.undo()
                        // },
                        //     100
                        // );
                        //console.log(selectedDiv)
                        // if(finalTranscripts.length+interimTranscripts.length>100){
                        //     let selectedrange=element.editor.getSelectedRange()
                        //     console.log("exceeded");
                        //     finalTranscripts+=interimTranscripts;
                        // element.editor.insertString(finalTranscripts);
                        // setcurrCursorPos([selectedrange[0]+finalTranscripts.length,
                        // selectedrange[0]+finalTranscripts.length]); 
                        //     finalTranscripts='';
                        //     interimTranscripts=''
                        // }


                        result.innerHTML =  '<span style="color: #999">' + interimTranscripts + '</span>';
                    }

                }
                if (finalTranscripts.length > 10) { finalTranscripts = '' }
            }; speechRecognizer.onerror = function (event) {
                setSpeech(false);
                console.log('error')
            }; speechRecognizer.onend = function (event) {
                setSpeech(false);
                console.log('end')
            };
        }

    }

    //MEDIUM
    // handleChange(text, medium) {
    //     console.log(text)
    //     this.setState({ text: text });
    // }

    //TRIX
    function handleChange(html, text) {
        var element = document.querySelector("trix-editor")
        //console.log(element.editor.getSelectedRange())
        localStorage.setItem("dom", html);
        localStorage.setItem("curPos", element.editor.getSelectedRange()[0]);
        //setcurrCursorPos([currCursorPos[0]+text.length,currCursorPos[1]+text.length])
        setTooltip(false);
    }
    function handleClick(e) {
        setTooltip(false);
        var element = document.querySelector("trix-editor");
        //element.editor.insertFile(file)
        localStorage.setItem("curPos", element.editor.getSelectedRange()[0]);

        if (e.type === 'click') {
            console.log(element.editor.getSelectedRange());
        } else if (e.type === 'contextmenu') {
            console.log('Right click');
            console.log('right',element.editor.getSelectedRange())
            //element.editor.insertHTML(`<img src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c"></img>`)
        }


        //if link
        if (e.target.closest("a") !== null) {
            let url = e.target.closest("a").getAttribute('href');
            //console.log(e.target.textContent);
            // e.target.textContent = "clicked"
            //console.log(element.editor.getClientRectAtPosition(currCursorPos[0]));
            setTooltip(true);
            setTooltipPos([e.target.getBoundingClientRect().x,
            e.target.getBoundingClientRect().y]);
            setTooltipContent({
                text: e.target.textContent,
                url: url
            });
            //fetchPunctuation()
        }


        //console.log(e.target.tagName)
        if (e.target.tagName !== "TEXTAREA") {
            const handle = setTimeout(() => {
                setcurrCursorPos(element.editor.getSelectedRange());
                //console.log("setting after timer");
                clearTimeout(handle);
            },
                800
            );
        } 
         if(e.target.tagName === "IMG") {
            console.log(e.target.getAttribute('src'));//get img url
        }

        //console.log(localStorage.getItem("curPos"));
    }
    function handleEditorReady(editor) {
        document.querySelector('.trix-button-group-spacer').innerHTML = `<div> Made with ❤️ &amp; ☕ By <a target="_blank" href="https://adigunturu.com">AdiGunturu</a></div>`

        // let node = document.getElementById('headingtwo');
        // let reactel = ReactDOM.findDOMNode(node); console.log(reactel); reactel.style.padding = "0px";
        // reactel.style.paddingRight = "10px";
        // reactel.style.paddingLeft = "10px";
        // document.querySelector('span.trix-button-group.trix-button-group--file-tools').appendChild(reactel)
        // let node = document.getElementById('imagebutton');
        // let reactel = ReactDOM.findDOMNode(node);
        // reactel.onClick=function() {console.log("imgBtnClicked?!imgBtnClicked:!imgBtnClicked")}
        document.querySelector('span.trix-button-group.trix-button-group--file-tools').style.display = "none"


        let posNum = parseInt(localStorage.getItem('curPos'))
        // this is a reference back to the editor if you want to
        // do editing programatically
        if (localStorage.getItem('dom')) {
            let html = localStorage.getItem("dom");

            editor.insertHTML(html);
            editor.recordUndoEntry("Insert Html");
            // editor.element.children[posNum].scrollIntoView();
            let currentPos = [posNum, posNum];

            //console.log(currentPos);
            var rect = editor.getClientRectAtPosition(posNum)
            //console.log([rect.left, rect.top])
            window.scroll(rect.left, rect.top);
            editor.setSelectedRange(currentPos);
            localStorage.setItem("curPos", currentPos[0]);
            setcurrCursorPos(currentPos);

            //console.log(editor.element.children[posNum])
        } else {
            localStorage.setItem("dom", `
            <h1><!--block--><strong>Welcome to </strong><a href="https://adigunturu.com/SpeakerQuill"><strong>SpeakerQuill</strong></a><strong>!&nbsp;</strong></h1><h3><!--block-->Styling</h3><div><!--block-->🗣 "Bold": <strong>Makes text bold<br></strong>🗣 "Italic": <em>Makes text Italic<br></em>🗣 "Underline": <u>Adds underline to the selected text</u></div><h2><!--block-->🗣 "Heading": Makes selected section into a H2 block</h2><pre><!--block-->🗣  "Code block": Turns selected section into a code block</pre><blockquote><!--block-->&nbsp;🗣 "Make it a Quote": Turns selected section into a quote</blockquote><h3><!--block-->Punctuation</h3><div><!--block-->🗣 "End of sentence": Adds a full stop.<br>🗣 "question mark": Adds a question mark.<br>🗣 "comma": Adds a comma.</div>
            `);
            editor.insertHTML(`
            <h1><!--block--><strong>Welcome to </strong><a href="https://adigunturu.com/SpeakerQuill"><strong>SpeakerQuill</strong></a><strong>!&nbsp;</strong></h1><h3><!--block-->Styling</h3><div><!--block-->🗣 "Bold": <strong>Makes text bold<br></strong>🗣 "Italic": <em>Makes text Italic<br></em>🗣 "Underline": <u>Adds underline to the selected text</u></div><h2><!--block-->🗣 "Heading": Makes selected section into a H2 block</h2><pre><!--block-->🗣  "Code block": Turns selected section into a code block</pre><blockquote><!--block-->&nbsp;🗣 "Make it a Quote": Turns selected section into a quote</blockquote><h3><!--block-->Punctuation</h3><div><!--block-->🗣 "End of sentence": Adds a full stop.<br>🗣 "question mark": Adds a question mark.<br>🗣 "comma": Adds a comma.</div>
            `);
            localStorage.setItem("curPos", 27);
            editor.setSelectedRange([27, 27]);
            setcurrCursorPos([27, 27]);
        }
    }

    var browser = (function (agent) {
        switch (true) {
            case agent.indexOf("edge") > -1: return "edge";
            case agent.indexOf("edg/") > -1: return "EdgeChrome"; // Match also / to avoid matching for the older Edge
            case agent.indexOf("opr") > -1 && !!window.opr: return "opera";
            case agent.indexOf("chrome") > -1 && !!window.chrome: return "chrome";
            case agent.indexOf("trident") > -1: return "ie";
            case agent.indexOf("firefox") > -1: return "firefox";
            case agent.indexOf("safari") > -1: return "safari";
            default: return "other";
        }
    })(window.navigator.userAgent.toLowerCase());

    // function URLtoFile(url) {
    //     var element = document.querySelector("trix-editor");
    //     url = 'https://th.bing.com/th/id/OIP.OF59vsDmwxPP1tw7b_8clQHaE8?pid=ImgDet&rs=1'
    //     const fileName = 'myFile.jpg'

    //     fetch(url)
    //         .then(async response => {
    //             const contentType = response.headers.get('content-type')
    //             const blob = await response.blob()
    //             const file = new File([blob], fileName, { contentType })
    //             // access file here
    //             element.editor.insertFile(file)
    //         })
    // }

    function handleImgURLInput(e) {
        console.log(e.target.value);
        setImgInputURL(e.target.value)
    }

    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
      };

    function insertimage(){//console.log(isValidURL(imgInputURL))
        var element = document.querySelector("trix-editor");
        if (isValidURL(imgInputURL)===true) {
            //insert the image
            element.editor.insertHTML(`<img src="${imgInputURL}"></img>`);
            element.editor.recordUndoEntry("Insert Image");
            setimgBtnClicked(false);
        }else{
            setState({open:true,vertical: 'top',horizontal: 'center'});
        }
    }

    function handleClose(){
        setState({open:false,vertical: 'top',horizontal: 'center'});
    }
    

    function fetchPunctuation(text) {
        fetch("http://bark.phon.ioc.ee/punctuator", {
            body: "text=hello%20world",
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        }).then(data => {
            console.log(data.json())
        });
    }
    return (
        
        <div className="app">
            <div id="ifMobile" style={{display:'none',
           width: "100vw",
           height: "100vw",
           position: "absolute",
           zIndex: "10000000000000",
           background: "#fbf7f0",
           padding: "10px"
            }}>
                This app doesn't work very well on mobile. Please use a desktop to view this.
            </div>
            {/* <ReactMediumEditor options={{
                    toolbar: {
                        buttons: ['bold',
                            'italic',
                            'underline',
                            'strikethrough',
                            'subscript',
                            'superscript',
                            'anchor',
                            'quote',
                            'unorderedlist',
                            // 'justifyLeft',
                            // 'justifyCenter',
                            // 'justifyRight',
                            // 'justifyFull',
                            'h1',
                            'h2',
                            'h3']
                    }
                }} text={this.state.text} onChange={this.handleChange} 
                /> */}
            <div id="TheEditor" onClick={(e) => handleClick(e)} onContextMenu={handleClick} style={{ paddingBottom: "20px" }}>
                <TrixEditor mergeTags={mergeTags} onChange={handleChange} onEditorReady={handleEditorReady} />

                <div className="speak">
                    <div id="interimTranscripts" style={{ textAlign: "center"}}><p style={{ textAlign: "center", margin: '0' }}>Speak Your Essay!</p></div>
                    <IconButton id="speechButton" onClick={Speechbtn}> {
                        speech ?
                            <RecordVoiceOverIcon />
                            :
                            <VoiceOverOffIcon />
                    }</IconButton></div>
            </div>


            <div id="ContextualToolTip"
                style={{
                    position: "absolute",
                    color: "#0090ff",
                    top: `${tooltipPos[1] - 40}px`,
                    left: `${tooltipPos[0]}px`,
                    zIndex: "2147483647",
                    background: "#fbf7f0",
                    borderRadius: "9px",
                    margin: "0px",
                    width: "fit-content",
                    padding: "6px",
                    display: tooltip === true ? "flex" : "none",
                    boxShadow: "#0000003d 0px 0px 5px 1px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                    textDecoration: "underline"
                }}
                className="highlightHoverTooltip"><a style={{ display: "flex", alignItems: "center" }}
                    target="_blank" href={tooltipContent.url}>
                    <div style={{ marginRight: "4px" }}>{tooltipContent.text}</div>
                    <LaunchIcon />
                </a></div>









        <div id="InsertImageLink" 
        className="highlightHoverTooltip" 
        style={{
        position: "fixed",
        color: "rgb(0, 144, 255)",
        zIndex: "2147483647",
        background: "rgb(251, 247, 240)",
        borderRadius: "9px",
        margin: "0px",
        width: "fit-content",
        height: "40px",
        padding: "6px 10px",
        display: imgBtnClicked?"flex":"none",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 0px 5px 1px",
        top: "7%",
        left: "19%",
        alignItems: "center",
    flexDirection: "row"}}>
            <Input onChange={handleImgURLInput} type="text" placeholder="Enter image URL"></Input>
            <IconButton onClick={insertimage}
            style={{background: "#faebd700",padding: "0px",paddingLeft: "9px"}} size={"medium"}><DoneIcon/></IconButton>
        </div>

        <Snackbar
        
        open={open}
        // onClose={handleClose}
        message="I love snacks"
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleClose}
      >
        <div id="snackbar" onClose={handleClose} sx={{ width: '100%' }}>
          Please enter a valid URL
        </div>
        </Snackbar>
        </div>
    )

}

export default Home;
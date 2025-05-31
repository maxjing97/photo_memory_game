import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//add component to display the challenge

//lists of the words corresponding to the images in the order
// sorted in folders for each of the image lists
const listA = ["lantern", "valley","spoon", "lightning", "puzzle",
 "carpet","robot","mirror", "volcano","guitar"]

const listB = ["forest", "castle","ladder", "notebook", "candle",
        "anchor","helmet","river", "statue","clock"]

const listC = ["train", "feather","coins", "whale", "telescope",
        "compass","dragon","fountain", "diamond","mask"] 

//function to get the paths of photos for a certain list
function getFolderPaths(letter) {
  let paths = []

  for(let i = 1; i <= 10; i++) {
    paths.push(`../test_images/list${letter}/${String(i)}.png`)
  }
  return paths 
}

//function to randomly select a word list with its name, and a randomly selected irrelevant word list
function randomWordList() {
  //randomly select a list to use
  const list_names = ["A","B","C"] 
  const list_chosen = list_names[Math.floor(Math.random() * list_names.length)];
  //get the correspoding words in order
  let word_list = []
  let irrelevant_list = [] //word list of excluded words to include in the list of 10 irrelevant words to be randomly chosen

  switch(list_chosen) {
    case "A":
      word_list = listA
      irrelevant_list = listB.concat(listC)
      break;
    case "B":
      word_list = listB
      irrelevant_list = listA.concat(listC)
      break;
    case "C":
      word_list = listC
      irrelevant_list = listA.concat(listB)
      break;
  }
  
  //randomly select 10 from the list 
  let irrelevant_words = new Set()
  while (irrelevant_words.size < 10) {
    const random = irrelevant_list[Math.floor(Math.random()*irrelevant_list.length)]
    irrelevant_words.add(random)
  }
  irrelevant_words = Array.from(irrelevant_words) //convert to list

  return [list_chosen, word_list, irrelevant_words ]
}

//child component 1: display images + text etc
const TextImageSplit = ({ text, imageUrl}) => {
  return (
    <div style={styles.img_container}>
      <div style={styles.img_text}>{text}</div>
      <img src={imageUrl} alt="Should Not" style={styles.image} />
    </div>
  );
};

//child component 2: display text and more for the text input
const TextInput = () => {
  return (
    <div>
      <h2>Try to remember the word you just saw</h2>
    </div>
  );
};

//function to get the list of components used
function getComponents() { 
  let component_list = []
  let final_word_list = [] //final word list to return 
  //loop through the 3 conditions, 10 images for each condition (1==relevant image + text, 2 == no image + text, 3==irrelevant image + text)
  for(let cond = 1; cond <= 3; cond++) {
    const [list_name, relevant, irrelevant] = randomWordList() //destructure
    let image_paths = getFolderPaths(list_name)
    let wordList = [] //we choose either relevant or irrelevant word lists to used based on the condition
    if(cond == 1) {
      wordList = relevant
    } else {
      wordList = irrelevant
    }
    //additionally, if image condition if 2, we set image paths of invalid (bc we want to show no images)
    if(cond === 2) {
      image_paths = Array(10).fill("../bs")
    }
    if(cond == 2) {
      image_paths = Array(10).fill("/test_images/blank.png")
    }
    for(let i = 0; i < 10; i++) {
      //pass to another defined component that returns the image+card combination
      //depending on the condition, we give different combinations to the components
      const currWord = wordList[i]
      final_word_list.push(currWord)//add word to the final word list
      const imageComponent = <TextImageSplit text={currWord} imageUrl={image_paths[i]}/>
      const textInput = <TextInput/>
      component_list.push(imageComponent) //add image component to the list
      component_list.push(textInput)
    }
  }
  //return the total word list and the component list
  return [component_list, final_word_list]
}

////tracks accuracy of all words 30 for now, every 10 different conditions
let accuracies = Array(30).fill(0)
const [components, word_list] = getComponents() //get list of current components, word list

export default function Images(props) { //main parent image component (to avoid remounts when changing child components shown)
  const [index, setIndex] = useState(0); //this index is key, cycling through through all words (60 for now 2 for ach)
  const [isText, setIsText] = useState(0); //states weather we access the first (image) or second(text) component in our current 2-element component
  const [text, setText] = useState(''); //set text in the input box
  const [cond, setCond] = useState(1); //image condition: possible choices are 1-3
  const [nextText, setnextText] = useState("Skip to test ➡");//text to display in the next button
  const navigate = useNavigate();
    
  useEffect(() => { //testing if component is unmounted (avoid necessary ones to preserve state)
    return () => console.log('Unmounted');
  }, []);

  const nextSection = () => { // (0 by default)
    //if isText is 0, this is an image one, so we move to a text one (so we stay on the same word)
    if (isText == 0) {
      setIndex((prev) => (prev + 1)); //go to the next one as long as the end has not been reached
      setIsText(1); //move to the text section 
      setnextText("Don't Remember? Try the Next Word ➡")
    } else { //in this case, the user has skipped the section, so record the accuracy as 0 for this, while moving on to the next image to test
      setIsText(0); //move to the word section 
      setIndex((prev) => (prev + 1)); //go to the next one as long as the end has not been reached
      setnextText("Skip to test ➡")//set the appropriate text for the button
      //update component list to the next index since state changes in React do not apply immediately, being applied by the next render cycle
    }
  }

  //function used to handle changes in the text input box
  const handleTextChange = (e) => {
    setText(e.target.value) //set the text value dynamically
    console.log("index:", index)
    const value = e.target.value;
    const targetWord = word_list[(index-1)/2] //get the target for based on the for index
    console.log("targetWord:",targetWord)
    if (value.trim().toLowerCase() === targetWord.toLowerCase()) {
      setText("") //reset if there is match
      console.log("trigged: correct text entered")
      accuracies[(index-1)/2] = 1 //find the correponding accuracy index to change
      nextSection() //more to the next one
    }
  };

  //function to advance the component if the enter key is pressed in the text book
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      nextSection();
    }
  }

  console.log("accuracies:", accuracies)

  return (
    <div style={styles.all}>
      <h1>Let's see how you remember 10 words with and without the help of images</h1>
      <h2>you have {props.time} seconds for each word</h2>

      <div style={styles.text_container}>
      {/* render all components with varying visiblity to avoid unmounting, destroying vital state variables. Renders components in order*/}
      {components.map((Component, i) => (
        <div key={i} style={{ display: index == i ? 'block' : 'none' }}>
          {Component}
        </div>
      ))}

      {/* button for inputting text-display only if the index is odd*/}
      
        <div style={{ display: (index % 2 == 1) ? 'block' : 'none' }}>
          <div style={styles.text_wrapper}>
            <input
              type="text"
              value = {text}
              onChange={handleTextChange}
              onKeyDown={handleEnterPress}
              placeholder="Start typing..."
              style={styles.text_input}
            />
          </div>
        </div>
      </div>

      <button onClick={nextSection} onKeyDown={handleEnterPress} style={styles.skip}>{nextText}</button> {/* skip function inherted from parent component*/}
      <button onClick={() => navigate('/')} style={styles.back}>
      ⬅ Back to Menu
      </button>
    </div>
  );
};

//image card to display the images

const styles = {
  img_container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    padding: '10px',
  },
  img_text: {
    flex: 1,
    fontSize: '20pt',
  },
  image: {
    height: '350px',
    width:"350px",
    objectFit: 'contain',
  },
  all: {
    display: "flex", 
    flexDirection: "column",
    alignItems: 'center',
    textAlign: 'center',
  },
  back: {
    backgroundColor: '#e63946',     // vibrant red
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  }, 
  skip: {
    backgroundColor: '#44e02f',     // vibrant red
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  }, text_wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  text_input : {
    padding: "5px",
    fontSize: '20px',   // Large font
    fontWeight: 'bold'  // Bold text
  },
  text_container: {
    padding: '12px',
    fontSize: '1rem',
    width: '400px',
    height: '400px',
    border: '3px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  }
};

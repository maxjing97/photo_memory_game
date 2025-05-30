import React, { useState, useEffect } from 'react';
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
const TextImageSplit = ({ text, imageUrl, handleSkip}) => {
  return (
    <div style={styles.img_container}>
      <div style={styles.img_text}>{text}</div>
      <img src={imageUrl} alt="Should Not" style={styles.image} />

      <button onClick={handleSkip} style={styles.skip}>Skip to test ➡</button> {/* skip function inherted from parent component*/}
    </div>
  );
};
//child component 2: submission component
const WordMatcher = ({ targetWord,  handleTextSkip }) => {
  const [correct, setCorrect] = useState(0); // store if the value is correct or not

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("Current typed word:"+value)
    console.log("current target word:"+targetWord)
    if (value.trim().toLowerCase() === targetWord.toLowerCase()) {
      setCorrect(1)
      handleTextSkip() //if word matches, handle the textSkip
    }
  };

  return (
    <div style={styles.text_wrapper}>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Start typing..."
        style={styles.text_input}
      />
      <button onClick={handleTextSkip} style={styles.skip}>Don't Remember? Try the Next Word ➡</button> {/* skip function inherted from parent component*/}
    </div>
  );
}

{/*create 2 final JSON object (keys are conditions) of words and the matching image files links, used to create react components in the main function*/}
function getFinalObjs() {
  let returnWords = {
    1: [],
    2: [],
    3: []
  }
  let returnImages = {
    1: [],
    2: [],
    3: []
  }
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
    if(cond == 2) {
      image_paths = Array(10).fill("/test_images/blank.png")
    }
    returnWords[cond] = wordList
    returnImages[cond] = image_paths 
  }
  return [returnWords,returnImages]
}


function getComponents(handleSkip, handleTextSkip) { 
  let return_list = []
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
    if(cond == 2) {
      image_paths = Array(10).fill("/test_images/blank.png")
    }
    for(let i = 0; i < 10; i++) {
      //pass to another defined component that returns the image+card combination
      //depending on the condition, we give different combinations to the components
      const currWord = wordList[i]
      const imageComponent = <TextImageSplit text={currWord} imageUrl={image_paths[i]} handleSkip={handleSkip}/>
      const matchingComponent = <WordMatcher targetWord={currWord} handleTextSkip={handleTextSkip}/> //component to test matching
      return_list.push(imageComponent) //add image component to the list
      return_list.push(matchingComponent)//add selector (allows user to score)
    }
  }
  return return_list
}


const [wordsObj, imageObj] = getFinalObjs() //get objects describing the image links and wordlists

export default function Images(props) { //main parent image component 
  const [index, setIndex] = useState(0); //this index is key, the
  const [cond, setCond] = useState(1); //image condition: possible choices are 1-3
  const [cond1, setCond1] = useState(0);//cond 1 accuracy (tracks accuracy of all cond1 cases)
  const [cond2, setCond2] = useState(0);//cond 1 accuracy (tracks accuracy of all cond1 cases)
  const [cond3, setCond3] = useState(0);//cond 1 accuracy (tracks accuracy of all cond1 cases)
  const navigate = useNavigate();

  //function to handle the skip between text components to photo-image ones 
  const handleTextSkip = () => {
    if (index < 9 && cond < 3) { //if the index is less than 10
      
      console.log("new index:",index+1, "new text:", wordsObj[cond][index], "current cond", cond)
      setComponent(<TextImageSplit text={wordsObj[cond][index+1]} imageUrl={imageObj[cond][index+1]} handleSkip={handleSkip}/>)
      setIndex((prev) => (prev + 1)); //go to the next one as long as the end has not been reached 
    }
    else if (index == 9 && cond < 3) {
      //in this case, update the conditioning number
      setComponent(<TextImageSplit text={wordsObj[cond+1][0]} imageUrl={imageObj[cond+1][0]} handleSkip={handleSkip}/>)
      setIndex(0) //reset to 0
      setCond((prev)=>(prev+1))//increment condition
    } else if (cond == 3) {
      setComponent(<div>done</div>)
    }
    
  }
  // function to handle the skip between photos -image components
  const handleSkip = () => {
    //here, go to the word validator
    setComponent(<WordMatcher targetWord={wordsObj[cond][index]} handleTextSkip={handleTextSkip}/>)
  };


  //set the current react component 
  //set the current react component.
  const [currComponent, setComponent] = useState(<TextImageSplit text={wordsObj[cond][index]} imageUrl={imageObj[cond][index]} handleSkip={handleSkip}/>)

  return (
    <div style={styles.all}>
      <h1>Let's see how you remember 10 words with and without the help of images</h1>
      <h2>you have {props.time} seconds for each word</h2>

      {currComponent} {/* render component in the index*/}
      
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
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  all: {
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
    marginTop: '100px',
    padding: "120px"
  },
  text_input: {
    padding: '12px 20px',
    fontSize: '1rem',
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  }
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//add component to display the challenge

//lists of the words corresponding to the images in the order
// sorted in folders for each of the image lists
const listA = ["lattern", "valley","spoon", "lightning", "puzzle",
        "carpet","robot","mirror", "volcano","guitar"]

const listB = ["forest", "castle","ladder", "notebook", "candle",
        "anchor","helmet","river", "statue","clock"]

const listC = ["train", "feather","coins", "whale", "telescope",
        "compass","dragon","fountain", "diamond","mask"] 

// Sample components to cycle through
const ComponentA = () => <div style={styles}>Component A</div>;
const ComponentB = () => <div style={styles}>Component B</div>;
const ComponentC = () => <div style={styles}>Component C</div>;

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
const TextImageSplit = ({ text, imageUrl }) => {
  return (
    <div style={styles.img_container}>
      <div style={styles.img_text}>{text}</div>
      <img src={imageUrl} alt="No Image Round" style={styles.image} />
    </div>
  );
};


{/* create components based on image conditions*/}
function getComponents() { 
  let return_list = []
//loop through the 3 conditions, 10 images for each condition (1==relevant image + text, 2 == no image + text, 3==irrelevant image + text)
  for(let cond = 1; cond <= 3; cond++) {
    const [list_name, relevant, irrelevant] = randomWordList() //destructure
    let image_paths = getFolderPaths(list_name)
    let wordList = [] //we choose either relevant or irrelevant word lists to used based on the condition
    if(cond === 1) {
      wordList = relevant
    } else {
      wordList = irrelevant
    }
    //additionally, if image condition if 2, we set image paths of invalid (bc we want to show no images)
    if(cond === 2) {
      image_paths = Array(10).fill("../bs")
    }
    for(let i = 0; i < 10; i++) {
      //pass to another defined component that returns the image+card combination
      //depending on the condition, we give different combinations to the components
      const imageComponent = <TextImageSplit text={wordList[i]} imageUrl={image_paths[i]}/>
      return_list.push(imageComponent) //add image component to the list
      //add selector (allows user to score)
    }
  }
  return return_list
}

export default function Images(props) { //main parent image component 
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const componentsList = getComponents()


  // Manual skip button
  const handleSkip = () => {
    setIndex((prev) => (prev + 1) % componentsList.length);
  };
  
  return (
    <div style={styles.all}>
      <h1>Let's see how you remember 10 words with and without the help of images</h1>
      <h2>you have {props.time} seconds for each image</h2>

      {componentsList[index]} {/* render component in the index*/}
      <div>
        <button onClick={handleSkip} style={styles.skip}>Skip to test →</button>
      </div>
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
  }
};

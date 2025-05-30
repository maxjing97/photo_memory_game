import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

//function to randomly select a word list
function randomWordList() {
  //randomly select a list to use
  const list_names = ["A","B","C"] 
  const list_chosen = list_names[Math.floor(Math.random() * list_names.length)];
  //get the correspoding words in order
  let word_list = []
  switch(list_chosen) {
    case "A":
      word_list = listA
      break;
    case "B":
      word_list = listB
      break;
    case "C":
      word_list = listC
      break;
  }
  
  return [list_chosen, word_list]
}

{/* create components based on image conditions*/}
function getComponents() { 
  const [list_name, main_list] = randomWordList() //destructure

  let return_list = []
  for(let i = 1; i <= 30; i++) {
    //pass to another defined component that returns the image+card combination
    
    return_list.push() //add component to the list
  }

  return return_list
}

function Images(props) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const componentsList = getComponents()


  // Automatically advance every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % componentsList.length);
    }, 10000); // 10,000ms = 10s

    return () => clearInterval(timer); // Cleanup on unmount or re-render
  }, []);

  // Manual skip button
  const handleSkip = () => {
    setIndex((prev) => (prev + 1) % componentsList.length);
  };

  const CurrentComponent = componentsList[index]; 
  
  return (
    <div style={styles.all}>
      <h1>Let's see how you remember 10 words with and without the help of images</h1>
      <h2>you have {props.time} seconds for each image</h2>

      <CurrentComponent />
      <div>
        <button onClick={handleSkip} style={styles.skip}>Skip to test →</button>
      </div>
      <button onClick={() => navigate('/')} style={styles.back}>
      ⬅ Back to Menu
      </button>
    </div>
  );
};

export default Images;

const styles = {
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

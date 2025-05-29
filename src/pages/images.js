import React from 'react';
import { useNavigate } from 'react-router-dom';

//lists of the words corresponding to the images in the order
// sorted in folders for each of the image lists
listA = ["lattern", "valley","spoon", "lightning", "puzzle",
        "carpet","robot","mirror", "volcano","guitar"]

listB = ["forest", "castle","ladder", "notebook", "candle",
        "anchor","helmet","river", "statue","clock"]

listC = ["train", "feather","coins", "whale", "telescope",
        "compass","dragon","fountain", "diamond","mask"] 

function Images(props) {
  const navigate = useNavigate();

  return (
    <div style={styles.all}>
      <h1>Let's see how you remember 10 words with and without the help of images</h1>
      <h2>you have {props.time} seconds</h2>
      
      <button onClick={() => navigate('/')} style={styles.back}>
          ⬅ Back to Menu
      </button>
    </div>
  );
}

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
  }
};
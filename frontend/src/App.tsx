import React, { useState, ChangeEvent } from 'react';
import './App.css';
import Images from './Image';
import { stateInterface } from './types';  // Adjust the path as needed

const App:React.FC = () => {
  let [images, setImages] = useState('');

  const [imageState, setImageState] = React.useState<stateInterface>({
    xCoor: 200,
    yCoord: 200,
    width: 30,
    height: 20,
    isSelected: false,
    url: ''
  });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "image/png") {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);      
      // setImages(imageUrl);
      setImages(imageUrl);
    } else {
      alert("Please upload a PNG file");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <input type="file" id="input" accept="image/*" multiple onChange={handleImageUpload}/>

        </p>
        
      </header>
      <div>
          <Images data={imageState} updateData={setImageState}/>
        </div>
    </div>
  );
}

export default App;

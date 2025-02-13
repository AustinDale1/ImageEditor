import React, { useState, ChangeEvent, useEffect } from 'react';
import './App.css';
import Images from './Image';
import { stateInterface } from './Types';  // Adjust the path as needed
import FPSCounter from './FPSCounter';

const App:React.FC = () => {
  let [images, setImages] = useState<stateInterface[]>([]);
  const [index, setIndex] = useState(0);

  const [imageState, setImageState] = React.useState<stateInterface>({
    xCoord: 200,
    yCoord: 200,
    width: 600,
    height: 400,
    isSelected: false,
    isPressed: false,
    url: ''
  });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);      
      console.log('past');
      // setImages(imageUrl);
      const newObject: stateInterface = {
        xCoord: 200,
        yCoord: 200,
        width: 600,
        height: 400,
        isSelected: false,
        isPressed: false,
        url: imageUrl
      };
      setImages(prev => [...prev, newObject]);

      setImageState(prev => ({
        ...prev,
        url: imageUrl,
      }));
      console.log(images);
    } else {
      alert("Please upload a PNG file");
    }
  };

  useEffect(() => {
    console.log("fnmll");
    console.log(images);
    console.log(images.length);
  }, [images]);

  const getRefColor = () => {
    if(imageState.isSelected) {
      return 'blue';
    } else {
      return '';
    }
  }

  return (
    <div className="App">
      {images.length > 0 ? 
            images.map((image, indexButNotThatOne) => (
              <Images data={image}  setData={(newData: stateInterface | ((prev: stateInterface) => stateInterface)) => {
                setImages(prev => prev.map((img, i) => 
                  i === indexButNotThatOne ? 
                    // handle both function and direct value updates
                    (typeof newData === 'function' 
                      ? (newData as (prev: stateInterface) => stateInterface)(img)
                      : newData
                    )
                    : img
                ));
              }}/>
        
            )) : 
            <div>No images</div>
          }
      {/* <div style={{position: 'absolute', backgroundColor : getRefColor()}}>
          <Images data={imageState} setData={setImageState}/>
        </div> */}
      {/* <FPSCounter /> */}
      <div className='toolbar' style={{position: 'absolute', zIndex: 999, left: '90%', display: 'block'}}>
        <button style={{zIndex: 999, display: 'block'}}>Layers</button>
        <button style={{zIndex: 999, display: 'block'}}>Upload</button>
        <input type="file" id="input" accept="image/*" multiple onChange={handleImageUpload} style={{zIndex: 999, display: 'block'}}/>
        <button style={{zIndex: 999, display: 'block'}}>Text</button>
        <button style={{zIndex: 999, display: 'block'}}>Export</button>

      </div>
    </div>
  );
}

export default App;

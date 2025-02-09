import React, { useState, ChangeEvent } from 'react';
import './App.css';
import { stateInterface } from './types';

interface ChildProps {
    data: stateInterface;
    updateData: React.Dispatch<React.SetStateAction<stateInterface>>;
  }

const Images : React.FC<ChildProps> = ({ data, updateData }) => {
  let [images, setImages] = useState('');

  const handleClick = () => {

  };

  return (
    <div className="image">

    </div>
  );
}

export default Images;

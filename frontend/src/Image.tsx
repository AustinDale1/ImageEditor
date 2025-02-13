import React, { useState, useEffect } from 'react';
import './App.css';
import { stateInterface } from './Types';

interface ImageProps {
 data: stateInterface;
 setData: React.Dispatch<React.SetStateAction<stateInterface>>;
}

const DraggableImage: React.FC<ImageProps> = ({ data, setData }) => {
  console.log(data);
 // Track whether we're currently in a drag operation
 const [isDragging, setIsDragging] = useState(false);
 
 // Store the initial click offset from the image's top-left corner
 const [offset, setOffset] = useState({ x: 0, y: 0 });
 const [local, setLocal] = useState({ xCoord: data.xCoord, yCoord: data.yCoord,})

 // Handle the start of a drag operation
 const handleMouseDown = (e: React.MouseEvent) => {
   // Calculate how far the mouse is from the image's top-left corner
   setOffset({
     x: e.clientX - data.xCoord,
     y: e.clientY - data.yCoord
   });
   setIsDragging(true);
   
   // Prevent text selection while dragging
   e.preventDefault();
 };

 // Set up global mouse event listeners when dragging starts
 useEffect(() => {
   if (isDragging) {
     const handleMouseMove = (e: MouseEvent) => {
      setLocal(prev => ({
        ...prev,
        xCoord: e.clientX - offset.x,
        yCoord: e.clientY - offset.y
      }));
      
       setData(prev => ({
         ...prev,
         xCoord: e.clientX - offset.x,
         yCoord: e.clientY - offset.y
       }));
     };

     const handleMouseUp = () => {
       setIsDragging(false);
     };

     // Add listeners to window so we can catch mouse movement
     // even if it leaves the original element
     window.addEventListener('mousemove', handleMouseMove);
     window.addEventListener('mouseup', handleMouseUp);

     // Cleanup listeners when dragging stops or component unmounts
     return () => {
       window.removeEventListener('mousemove', handleMouseMove);
       window.removeEventListener('mouseup', handleMouseUp);
     };
   }
 }, [isDragging, offset, setData]); // Only re-run if these dependencies change

 // Optional: handle selection state
 const handleClick = (e: React.MouseEvent) => {
   // Prevent click from firing at end of drag
   if (!isDragging) {
     setData(prev => ({
       ...prev,
       isSelected: !prev.isSelected
     }));
   }
 };

 return (
   <div 
     className={`draggable-image ${data.isSelected ? 'selected' : ''}`}
     style={{
       position: 'absolute',
      //  left: `${data.xCoord}px`,
      //  top: `${data.yCoord}px`,
       transform: `translate(${local.xCoord}px, ${local.yCoord}px)`,
       width: `${data.width}px`,
       height: `${data.height}px`,
       cursor: isDragging ? 'grabbing' : 'grab',
       // Add a subtle transform while dragging
      //  transform: isDragging ? 'scale(1.02)' : 'scale(1)',
       transition: 'transform 0.1s',
       willChange: 'transform',
       zIndex: 1,
     }}
     onMouseDown={handleMouseDown}
     onClick={handleClick}
   >
     {data.url ? (
       <img 
         src={data.url} 
         alt="Draggable content"
         style={{ width: '100%', height: '100%', objectFit: 'contain' }}
       />
     ) : (
       <div className="placeholder">Drop Image Here</div>
     )}
   </div>
 );
};

export default DraggableImage;
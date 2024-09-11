import React from 'react';

interface ShapeProps {
  shape: {
    clipPath: string;
    color: string;
  };
}

const CoolRandomShape: React.FC<ShapeProps> = ({ shape }) => {
  const shapeStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: shape.clipPath,
    backgroundColor: shape.color,
  };

  return <div style={shapeStyle}></div>;
};

export default CoolRandomShape;
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from '../components/Home';

export default function HomePage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Home />
    </DndProvider>
  );
}

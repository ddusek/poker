import React from 'react';
import Home from './Homepage'
import MenuForm from './components/MenuForm'

function App() {
    return (
        <div>
            <MenuForm handleSubmit='asd' />
            <Home />
        </div>
    );
}

export default App;
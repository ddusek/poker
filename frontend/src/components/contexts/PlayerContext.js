import React, { createContext, useState } from 'react';

const PlayerContext = createContext(null);

const PlayerContextProvider = () => {
    const [player, setPlayer] = useState({});
    return <PlayerContext.Provider value={[player, setPlayer]} />;
};
export default PlayerContext;

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Dynamically import svgs as components
const CardIcon = ({ name, size = 32 }) => {
    CardIcon.propTypes = {
        name: PropTypes.string.isRequired,
        size: PropTypes.number,
    };
    CardIcon.defaultProps = {
        size: 32,
    };
    const ImportedIconRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const importIcon = async () => {
            try {
                // Import must contain some path information here, otherwise it wont work
                ImportedIconRef.current = (await import(`./../../../media/${name}`)).ReactComponent;
            } finally {
                setLoading(false);
            }
        };
        importIcon();
    }, [name]);

    if (!loading && ImportedIconRef.current) {
        const { current: ImportedIcon } = ImportedIconRef;
        return <ImportedIcon width={size} height={size * (3 / 2)} />;
    }
    return null;
};

export default CardIcon;

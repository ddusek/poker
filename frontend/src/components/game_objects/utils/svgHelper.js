import React, { useState, useEffect, useRef } from 'react';

// Dynamically import svgs as components
const SvgIcon = ({ name, ...rest }) => {
    const ImportedIconRef = useRef(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      const importIcon = async () => {
        try {
          // Import must contain some path information here, otherwise it wont work
          ImportedIconRef.current = (await import(`./../../../media/${name}.svg`)).ReactComponent;
        } catch (err) {
          throw err;
        } finally {
          setLoading(false);
        }
      };
      importIcon();
    }, [name]);
  
    if (!loading && ImportedIconRef.current) {
      const { current: ImportedIcon } = ImportedIconRef;
      return <ImportedIcon {...rest} />;
    }
    return null;
  };

  export default SvgIcon;
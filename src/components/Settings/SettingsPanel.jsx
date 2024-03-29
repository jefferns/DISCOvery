import { useEffect, useRef, useState } from 'react';
import './settingsPanel.css';
import { AdvancedSettings } from './AdvancedSettings';
import TimeFrame from './TimeFrame';


const SettingsPanel = ({settings, show, setSettings, setShowSettings}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    // Close Panel on click outside panel
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ setShowSettings ]);

  const handleVolumeChange = (event) => {
    setSettings({...settings, volume:event.target.value});
  };

  const handleTimeChange = (event) => {
    setSettings({...settings, time_range: event.target.value});
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return show
    ? <div ref={ref} className='settings-panel'>
        <TimeFrame handleTimeChange={handleTimeChange} settings={settings}/>
        <div className='setting-option' id='volume'>
          <label>Volume: </label>
          <input
            className='slider'
            id='volume'
            type='range'
            min='0'
            max='100'
            step='1'
            value={ settings.volume }
            onChange={ handleVolumeChange }
          />
          <input
            type='text'
            id='volume-num'
            value={ Math.trunc(settings.volume )}
            onChange={ handleVolumeChange }
          />
        </div>
        { showAdvanced && <AdvancedSettings/> }
        
        <button onClick={toggleAdvanced}>{showAdvanced ? "Less" : "Advanced"}</button>
      </div>
    : null;
}
 
export default SettingsPanel;
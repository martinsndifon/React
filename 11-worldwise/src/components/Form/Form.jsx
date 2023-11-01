// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useUrlPosition } from '../../../Hooks/useUrlPosition';
import { useCities } from '../../contexts/CitiesContext';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './Form.module.css';
import Button from '../Button/Button';
import BackButton from '../BackButton/BackButton';
import convertToEmoji from '../helper';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');
  const [geoCodingError, setGeoCodingError] = useState('');

  useEffect(() => {
    if (!lat && !lng) return;

    setIsLoadingGeocoding(true);
    setGeoCodingError('');
    fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 🙂"
          );
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      })
      .catch((err) => setGeoCodingError(err.message))
      .finally(() => setIsLoadingGeocoding(false));
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate('/app/cities');
  }

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (isLoadingGeocoding) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

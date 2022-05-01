import { useRef, useState } from 'react';
import classes from './CheckoutForm.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveDigits = (value) => value.trim().length === 5;

const CheckoutForm = (props) => {
  const nameInput = useRef('');
  const streetInput = useRef('');
  const postalInput = useRef('');
  const cityInput = useRef('');

  const [formsInputValidity, setFormsInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostal = postalInput.current.value;
    const enteredCity = cityInput.current.value;

    const enteredNameisValid = !isEmpty(enteredName);
    const enteredStreetisValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveDigits(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    const formIsValid =
      enteredNameisValid &&
      enteredCityIsValid &&
      enteredPostalIsValid &&
      enteredStreetisValid;

    setFormsInputValidity({
      name: enteredNameisValid,
      street: enteredStreetisValid,
      postalCode: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
    });
  };

  const nameControlClasses = `${classes.control} ${
    !formsInputValidity.name ? classes.invalid : ''
  }`;
  const streetControlClasses = `${classes.control} ${
    !formsInputValidity.street ? classes.invalid : ''
  }`;
  const postalControlClasses = `${classes.control} ${
    !formsInputValidity.postalCode ? classes.invalid : ''
  }`;
  const cityControlClasses = `${classes.control} ${
    !formsInputValidity.city ? classes.invalid : ''
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your name</label>
        <input ref={nameInput} type="text" id="name" />
        {!formsInputValidity.name && (
          <p style={{ color: 'red' }}>Please enter a valid name.</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetInput} type="text" id="street" />
        {!formsInputValidity.street && (
          <p style={{ color: 'red' }}>Please enter a valid street.</p>
        )}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInput} type="text" id="postal" />
        {!formsInputValidity.postalCode && (
          <p style={{ color: 'red' }}>Please enter a valid postal code.</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input ref={cityInput} type="text" id="city" />
        {!formsInputValidity.city && (
          <p style={{ color: 'red' }}>Please enter a valid city.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;

import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Recaptcha: React.FC = () => {
    function onChange(value: any) {
        console.log('Captcha value:', value);
    }
    return (
        <div className="App">
            <ReCAPTCHA
                sitekey="6LfEXbkhAAAAABH71xHNPfqQ6M80MOopOhkHLTyk"
                onChange={onChange}
            />
        </div>
    );
};
export default Recaptcha;
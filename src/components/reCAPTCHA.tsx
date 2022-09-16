import { request } from 'https';
import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import requestStore from '../store/request';

const Recaptcha: React.FC = () => {
    function onChange(value: any) {
        if(value){
            requestStore.robot=true;
        }
    }
    return (
        <div className="App">
            <ReCAPTCHA
                sitekey="6LeeMgAiAAAAABLltkluy8_NP8YgbzwRQZqUCKhb"
                onChange={onChange}
            />
        </div>
    );
};
export default Recaptcha;



import axios from 'axios';
import AuthService from './AuthService';
export default class EventService extends AuthService {
    // Initializing important variables
    constructor() {
        super();
    }

    // addEvent(req) {
    //     super.setTokenToRequest();
    //     console.log('addEvent init ', req);
    //     return axios.post(this.domain + '/event/add', req, super.setTokenToRequest())
    //         .then(result => {
    //             console.log(result);
    //         }).catch(err => {
    //             console.log(err);
    //         });
    // }

    addEvent(req) {

        return axios.post(this.domain + '/event/add', req, super.setTokenToRequest())
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });

    }




}

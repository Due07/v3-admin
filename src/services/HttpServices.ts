import HttpMethod from './base/method';

export default abstract class HttpServices {

    HttpClient = new HttpMethod(import.meta.env.VITE_APP_SERVICE_PREFIX);

    // HttpTest = new HttpMethod('/asd');
}

export const services = new class services extends HttpServices {};

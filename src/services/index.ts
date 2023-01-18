import Http from './base/http';

export default abstract class HttpServices {
    // protected 这意味着这个类不能在包含它的类外被实例化，但是能被继承

    HttpClient = new Http(import.meta.env.VITE_APP_SERVICE_URL);
}

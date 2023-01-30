import { Get } from '@/scripts/decorator/class/apiRequest';
import { Get as GetAttribute } from '@/scripts/decorator/attribute/apiRequest';
import HttpServices from './HttpServices';

@Get('ga')
export class HahaServices extends HttpServices {
    @GetAttribute('/asd/:id/:name')
        getHaha!: (list: Object) => Promise<HttpResponseType<{value: string}>>;

    // getList!: (value: string) => Promise<HttpResponseType<{value: string}>>;
    getList(value: string): Promise<HttpResponseType<{value: string}>> {
        return this.HttpClient.get('./123', {params: value});
    };
    // {
    //     console.log(value);
    //     return this.HttpClient.get('/asd');
    // };

};
export default new HahaServices();


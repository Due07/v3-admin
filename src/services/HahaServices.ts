import { Get } from '@/scripts/decorator/class/apiRequest';
import { GetAttribute, PutAttribute } from '@/scripts/decorator/attribute/apiRequest';
import HttpServices from './HttpServices';

@Get('ga')
export class HahaServices extends HttpServices {
  ga = 1;
  @GetAttribute('/asd/:id/:name')
    getHaha!: (list: Object) => Promise<HttpResponseType<{ value: string }>>;

  // getList!: (value: string) => Promise<HttpResponseType<{value: string}>>;
  getList(value: string): Promise<HttpResponseType<{ value: string }>> {
    return this.HttpClient.get('./123', { params: value });
  };

  @PutAttribute('/as/:id')
    putHaha!: (list: Object) => Promise<HttpResponseType<{ value: string }>>;

};
export default new HahaServices();


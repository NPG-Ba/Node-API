import { Person } from '@/models/Person';
import { FormResponse } from '@/models/http/FormResponse';
import { MyHttpResponse } from '@/models/http/Response';
import { Error } from '@/models/http/Error';
import { ApiService } from '@/services/ApiService';

export class PersonService {
    public save(personForm: Person): Promise<any> {
        return ApiService.post(`/person`, personForm);
    }
    public search(params: any): Promise<any> {
        return ApiService.get(`/person/`, {
            params,
        });
    }
    public delete(params: any): Promise<any> {
        return ApiService.delete('/person/', {
            params
        });
    }
}

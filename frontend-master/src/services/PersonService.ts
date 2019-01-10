import { Person } from '@/models/Person';
import { FormResponse } from '@/models/http/FormResponse';
import { MyHttpResponse } from '@/models/http/Response';
import { Error } from '@/models/http/Error';
import { ApiService } from '@/services/ApiService';

export class PersonService {
    public save(personForm: Person): Promise<any> {
        return ApiService.post(`/person`, personForm);
    }
    public init(params: any): Promise<any> {
        return ApiService.get(`/person/`, {
            params,
        });
    }
    public more(params: any): Promise<any> {
        return ApiService.get(`/person/` + params[0] + '/' + params[1], {
            params,
        });
    }
    public delete(params: any): Promise<any> {
        return ApiService.delete('/person/' + params[0], {
            params,
        });
    }

    public up(params: any): Promise<any> {
        return ApiService.put('/person/' + parseInt(params[0]) + '/age', {
            params,
        });
    }

    public down(params: any): Promise<any> {
        return ApiService.put('/person/' + parseInt(params[0]) + '/agedown', {
            params,
        });
    }
}

import { Person } from '@/models/Person';
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
        
        return ApiService.get('/person/'+ params, {
        });
    }
    public delete(params: any): Promise<any> {
        return ApiService.delete('/person/' + params[0], {
        });
    }

    public up(params: any): Promise<any> {
        return ApiService.put('/person/' + parseInt(params[0])+'/age-up', {
            params,
        });
    }

    public down(params: any): Promise<any> {
        return ApiService.put('/person/'+parseInt(params[0])+'/age-down',{
            params,
        });
    }
    public Logs(params: any): Promise<any> {
        return ApiService.put('/person/'+ parseInt(params[0])+'/age-down',{
            params,
        });
    }
}

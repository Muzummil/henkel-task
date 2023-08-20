import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlannetService } from './plannet.service';
import { ApiService } from '@src/app/shared/data-access/api-service/api.service';
import { of } from 'rxjs';
import { CharacterPlannets } from '../models/CharacterPlannets';

describe('PlannetService', () => {
  let service: PlannetService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlannetService, ApiService],
    });
    service = TestBed.inject(PlannetService);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve plannet details', () => {
    const plannetId = 1;
    const plannetDetails: CharacterPlannets = {"message":"ok","result":{"properties":{"diameter":"10465","rotation_period":"23","orbital_period":"304","gravity":"1 standard","population":"200000","climate":"arid","terrain":"desert","surface_water":"1","created":"2023-08-19T03:47:04.713Z","edited":"2023-08-19T03:47:04.713Z","name":"Tatooine","url":"https://www.swapi.tech/api/planets/1"},"description":"A planet.","_id":"5f7254c11b7dfa00041c6fae","uid":"1","__v":0}};
    spyOn(apiService, 'get').and.returnValue(of(plannetDetails));

    const result$ = service.getPlannetDetails(plannetId);

    result$.subscribe((result) => {
      expect(result).toEqual(plannetDetails);
    });

    expect(apiService.get).toHaveBeenCalledWith(`planets/${plannetId}`);
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CharacterDetailsService } from './character-details.service';
import { ApiService } from '@src/app/shared/data-access/api-service/api.service';
import { of } from 'rxjs';
import { CharacterDetails } from '../models/CharacterDetails';

describe('CharacterDetailsService', () => {
  let service: CharacterDetailsService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterDetailsService, ApiService],
    });
    service = TestBed.inject(CharacterDetailsService);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve character details', () => {
    const characterId = 1;
    const characterDetails: CharacterDetails = {"message":"ok","result":{"properties":{"height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY","gender":"male","created":"2023-08-19T03:47:04.711Z","edited":"2023-08-19T03:47:04.711Z","name":"Luke Skywalker","homeworld":"https://www.swapi.tech/api/planets/1","url":"https://www.swapi.tech/api/people/1"},"description":"A person within the Star Wars universe","_id":"5f63a36eee9fd7000499be42","uid":"1","__v":0}};

    spyOn(apiService, 'get').and.returnValue(of(characterDetails));

    const result$ = service.getCharacterDetails(characterId);

    result$.subscribe((result) => {
      expect(result).toEqual(characterDetails);
    });

    expect(apiService.get).toHaveBeenCalledWith(`people/${characterId}`);
  });
});

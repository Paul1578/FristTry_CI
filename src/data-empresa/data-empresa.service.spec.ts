import { Test, TestingModule } from '@nestjs/testing';
import { DataEmpresaService } from './data-empresa.service';

describe('DataEmpresaService', () => {
  let service: DataEmpresaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataEmpresaService],
    }).compile();

    service = module.get<DataEmpresaService>(DataEmpresaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

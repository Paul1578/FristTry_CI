import { Test, TestingModule } from '@nestjs/testing';
import { DataEmpresaController } from './data-empresa.controller';

describe('DataEmpresaController', () => {
  let controller: DataEmpresaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataEmpresaController],
    }).compile();

    controller = module.get<DataEmpresaController>(DataEmpresaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

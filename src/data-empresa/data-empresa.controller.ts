import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { DataEmpresaService } from './data-empresa.service';
import { Empresa } from './entities/empresa.entity';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateEmpresaDto} from './dto/CreateEmpresa.dto';
import { UpdateEmpresaDto } from './dto/UpdateEmpresa.dto';

@ApiTags('Empresa')
@Controller('data-empresa')
export class DataEmpresaController {
    constructor(private readonly empresaService: DataEmpresaService) {}

  @Get()
  @ApiOkResponse({ status: 200, description: 'Successful query, recovered company', type: Empresa})
  @ApiNotFoundResponse({ status: 404, description: 'Empty.'})
  async findAll(): Promise<Empresa[]> {
    try{
      const result =  await this.empresaService.getListarEmpresa();
      if(result.length == 0){
        throw new NotFoundException(`Empty`);
      }
      return result
    } catch(error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
    
  }

  @Get('exists')
  @ApiQuery({ name: 'razonSocial', required: true })
  @ApiOkResponse({ status: 200, description: 'Check if the company exists.', type: Boolean })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  async checkExists(@Query('razonSocial') razonSocial: string): Promise<boolean> {
    try {
      if (!razonSocial) {
        throw new HttpException('Razon Social is required.', HttpStatus.BAD_REQUEST);
      }

      return await this.empresaService.empresaExiste(razonSocial);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get(':id')
  @ApiOkResponse({ status: 200, description: 'Successfully retrieved company', type: Empresa})
  @ApiNotFoundResponse({ status: 404, description: 'The requested company was not found.' })
  async findOne(@Param('id') id: number): Promise<Empresa> {
    try {
      const result = await this.empresaService.findOne(id);
      if (!result) {
        throw new NotFoundException(`Company with ID ${id} not found.`);
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Company not found.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Get('/search/by')
  @ApiOkResponse({ status: 200, description: 'The query has been successful.', type: Empresa})
  @ApiNotFoundResponse({ status: 404, description: 'The requested Company was not found.'})
  async search(@Query('query') query: string): Promise<Empresa[]> {
    try{
      const result = await this.empresaService.search(query);
      if(!result){
        throw new NotFoundException(`Company ${query} not found.`);
      }
      return result;
    }catch(error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Company not found.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiBody({ type: CreateEmpresaDto })
  @ApiOkResponse({ status: 200, description: 'The Company has been successfully created.', type: CreateEmpresaDto })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    try {
      // Verificar si la empresa ya existe
      const exists = await this.empresaService.empresaExiste(createEmpresaDto.razonSocial);
      if (exists) {
        throw new HttpException('La empresa con esa razón social ya existe.', HttpStatus.BAD_REQUEST);
      }
  
      // Crear la empresa
      return await this.empresaService.create(createEmpresaDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Put(':id')
  @ApiBody({ type: UpdateEmpresaDto })
  @ApiOkResponse({ status: 200, description: 'The Company has been successfully updated.', type: UpdateEmpresaDto })
  @ApiNotFoundResponse({ status: 404, description: 'The requested Company was not found.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  async update(@Param('id') id: number, @Body() updateCatalogoDto: UpdateEmpresaDto) {
    try {
      if (!updateCatalogoDto || Object.keys(updateCatalogoDto).length === 0) {
        throw new BadRequestException('The data you want to update is empty.');
      }
      const result = await this.empresaService.update(id, updateCatalogoDto);

      if (!result) {
        throw new NotFoundException(`The Company with ID ${id} is not found.`);
      }

      return result; 
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error; 
      }
      throw new Error('Company not found.');
    }
  }

  @Delete(':id')
  @ApiOkResponse({ status: 200, description: 'The Company has been successfully deleted.', type: Empresa })
  @ApiNotFoundResponse({ status: 404, description: 'The requested catalogue was not found.' })
  async remove(@Param('id') id: number): Promise<Empresa> {
    try {
      const deletedCatalogo = await this.empresaService.remove(id);
      if (!deletedCatalogo) {
        throw new NotFoundException(`Company with ID ${id} not found.`);
      }
      return deletedCatalogo; 
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new HttpException('Company not found.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

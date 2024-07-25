import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ValorCatalogo } from './entities/catalogo-valor.entity';
import { CatalogoValorService } from './catalogo-valor.service';
import { CreateValorCatalogoDto } from './dto/CreateCatalogoValor.dto';
import { UpdateValorCatalogoDto } from './dto/UpdateCatalogoValor.dto';

@ApiTags('Catalogo-Valor')
@Controller('catalogo-valor')
export class CatalogoValorController {
    constructor(private readonly catalogoValorService: CatalogoValorService) {}

  @Get()
  @ApiOkResponse({ status: 200, description: 'Successful query, recovered catalog value', type: ValorCatalogo})
  @ApiNotFoundResponse({ status: 404, description: 'Empty.'})
  async findAll(): Promise<ValorCatalogo[]> {
    try{
      const result =  await this.catalogoValorService.findAll();
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

  @Get(':id')
  @ApiOkResponse({ status: 200, description: 'Successfully retrieved catalog value', type: ValorCatalogo})
  @ApiNotFoundResponse({ status: 404, description: 'The requested catalog value was not found.' })
  async findOne(@Param('id') id: number): Promise<ValorCatalogo> {
    try {
      const result = await this.catalogoValorService.findOne(id);
      if (!result) {
        throw new NotFoundException(`Catalog value with ID ${id} not found.`);
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Catalog value not found.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Get('/search/by')
  @ApiOkResponse({ status: 200, description: 'The query has been successful.', type: ValorCatalogo})
  @ApiNotFoundResponse({ status: 404, description: 'The requested catalog value was not found.'})
  async search(@Query('query') query: string): Promise<ValorCatalogo[]> {
    try{
      const result = await this.catalogoValorService.search(query);
      if(!result){
        throw new NotFoundException(`Catalog value ${query} not found.`);
      }
      return result;
    }catch(error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Catalog value not found.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiBody({ type: CreateValorCatalogoDto })
  @ApiOkResponse({ status: 200, description: 'The catalogue value has been successfully created.', type: CreateValorCatalogoDto  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createValorCatalogoDto: CreateValorCatalogoDto ): Promise<ValorCatalogo> {
    try {
      if (!createValorCatalogoDto || Object.keys(createValorCatalogoDto).length === 0) {
        throw new HttpException('The creation data is empty.', HttpStatus.BAD_REQUEST);
      }

      const result = await this.catalogoValorService.create(createValorCatalogoDto);
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new HttpException('Catalog value not found.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiBody({ type: UpdateValorCatalogoDto  })
  @ApiOkResponse({ status: 200, description: 'The catalogue value has been successfully updated.', type: UpdateValorCatalogoDto  })
  @ApiNotFoundResponse({ status: 404, description: 'The requested catalog value was not found.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  async update(@Param('id') id: number, @Body() updateCatalogoDto: UpdateValorCatalogoDto) {
    try {
      if (!updateCatalogoDto || Object.keys(updateCatalogoDto).length === 0) {
        throw new BadRequestException('The data you want to update is empty.');
      }
      const result = await this.catalogoValorService.update(id, updateCatalogoDto);

      if (!result) {
        throw new NotFoundException(`Catalog value with ID ${id} not found.`);
      }

      return result; 
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error; 
      }
      throw new Error('Catalog value not found.');
    }
  }

  @Delete(':id')
  @ApiOkResponse({ status: 200, description: 'The selected catalog value has been successfully deleted.', type:  ValorCatalogo })
  @ApiNotFoundResponse({ status: 404, description: 'The requested catalog value was not found.' })
  async remove(@Param('id') id: number): Promise<ValorCatalogo> {
    try {
      const deletedCatalogo = await this.catalogoValorService.remove(id);
      if (!deletedCatalogo) {
        throw new NotFoundException(`Catalog value with ID ${id} not found.`);
      }
      return deletedCatalogo; 
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new HttpException('Catalog value not found.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

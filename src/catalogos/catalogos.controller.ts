import { Controller, Get, Post, Put, Delete, Param, Body, Query, NotFoundException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CatalogoService } from './catalogos.service';
import { CreateCatalogoDto} from './dto/CreateCatalogo.dto';
import { UpdateCatalogoDto } from './dto/UpdateCatalogo.dto';
import { Catalogo } from './entities/catalogo.entity';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Catalogo')
@Controller('catalogos')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  @Get()
  @ApiOkResponse({ status: 200, description: 'The query has been successfully.', type: Catalogo})
  @ApiNotFoundResponse({ status: 404, description: 'Empty.'})
  async findAll(): Promise<Catalogo[]> {
    try{
      const result =  await this.catalogoService.getListarCatalogo();
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
  @ApiOkResponse({ status: 200, description: 'Successfully retrieved item.', type: Catalogo})
  @ApiNotFoundResponse({ status: 404, description: 'Item not found.' })
  async findOne(@Param('id') id: number): Promise<Catalogo> {
    try {
      const result = await this.catalogoService.findOne(id);
      if (!result) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Catalogue not found', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Get('/search/by')
  @ApiOkResponse({ status: 200, description: 'The query has been successful.', type: Catalogo})
  @ApiNotFoundResponse({ status: 404, description: 'Not Foud.'})
  async search(@Query('query') query: string): Promise<Catalogo[]> {
    try{
      const result = await this.catalogoService.search(query);
      if(!result){
        throw new NotFoundException(`Item with ${query} not found`);
      }
      return result;
    }catch(error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Catalogue not found', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiBody({ type: CreateCatalogoDto })
  @ApiOkResponse({ status: 200, description: 'The Catalogue has been successfully created.', type: CreateCatalogoDto })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createCatalogoDto: CreateCatalogoDto): Promise<Catalogo> {
    try {
      if (!createCatalogoDto || Object.keys(createCatalogoDto).length === 0) {
        throw new HttpException('Create data is empty.', HttpStatus.BAD_REQUEST);
      }

      const result = await this.catalogoService.create(createCatalogoDto);
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new HttpException('Catalogue not found.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiBody({ type: UpdateCatalogoDto })
  @ApiOkResponse({ status: 200, description: 'The Catalogue has been successfully updated.', type: UpdateCatalogoDto })
  @ApiNotFoundResponse({ status: 404, description: 'Catalogue not found.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  async update(@Param('id') id: number, @Body() updateCatalogoDto: UpdateCatalogoDto) {
    try {
      if (!updateCatalogoDto || Object.keys(updateCatalogoDto).length === 0) {
        throw new BadRequestException('Update data is empty.');
      }
      const result = await this.catalogoService.update(id, updateCatalogoDto);

      if (!result) {
        throw new NotFoundException(`The Catalogue with ID ${id} is not found.`);
      }

      return result; 
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error; 
      }
      throw new Error('Catalogue not found.');
    }
  }

  @Delete(':id')
  @ApiOkResponse({ status: 200, description: 'The Catalogue has been successfully deleted.', type: Catalogo })
  @ApiNotFoundResponse({ status: 404, description: 'Catalogue not found.' })
  async remove(@Param('id') id: number): Promise<Catalogo> {
    try {
      const deletedCatalogo = await this.catalogoService.remove(id);
      if (!deletedCatalogo) {
        throw new NotFoundException(`Catalogue with ID ${id} not found.`);
      }
      return deletedCatalogo; 
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new HttpException('Catalogue not found', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  
}
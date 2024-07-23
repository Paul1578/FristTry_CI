import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CarreraService } from './carrera.service';
import { Carrera } from './entities/carrera.entity';
import { CreateCarreraDto } from './dto/CreateCarrera.dto';
import { UpdateCarreraDto } from './dto/UpdateCarrera.dto';

@ApiTags('Carrera')
@Controller('carrera')
export class CarreraController {
  constructor(private readonly carreraService: CarreraService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'The query has been successfully.',
    type: Carrera,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Empty.' })
  async findAll(): Promise<Carrera[]> {
    try {
      const result = await this.carreraService.findAll();
      if (result.length == 0) {
        throw new NotFoundException(`Empty`);
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  @Get(':id')
  @ApiOkResponse({
    status: 200,
    description: 'Successfully retrieved item.',
    type: Carrera,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Item not found.' })
  async findOne(@Param('id') id: number): Promise<Carrera> {
    try {
      const result = await this.carreraService.findOne(id);
      if (!result) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/search/by')
  @ApiOkResponse({
    status: 200,
    description: 'The query has been successful.',
    type: Carrera,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not Foud.' })
  async search(@Query('query') query: string): Promise<Carrera[]> {
    try {
      const result = await this.carreraService.search(query);
      if (!result) {
        throw new NotFoundException(`Item with ${query} not found`);
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiBody({ type: CreateCarreraDto })
  @ApiOkResponse({
    status: 200,
    description: 'The Carrera has been successfully created.',
    type: CreateCarreraDto,
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createCarreraDto: CreateCarreraDto): Promise<Carrera> {
    try {
      if (!createCarreraDto || Object.keys(createCarreraDto).length === 0) {
        throw new HttpException(
          'Create data is empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.carreraService.create(createCarreraDto);
      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiBody({ type: UpdateCarreraDto })
  @ApiOkResponse({
    status: 200,
    description: 'The Carrera has been successfully updated.',
    type: UpdateCarreraDto,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Carrera not found.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  async update(
    @Param('id') id: number,
    @Body() updateCarreraDto: UpdateCarreraDto,
  ) {
    try {
      if (!updateCarreraDto || Object.keys(updateCarreraDto).length === 0) {
        throw new BadRequestException('Update data is empty.');
      }
      const result = await this.carreraService.update(id, updateCarreraDto);

      if (!result) {
        throw new NotFoundException(`Carrera with ID ${id} not found.`);
      }

      return result;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new Error('Internal Server Error');
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    status: 200,
    description: 'The Carrera has been successfully deleted.',
    type: Carrera,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Carrera not found.' })
  async remove(@Param('id') id: number): Promise<Carrera> {
    try {
      const deletedCarrera = await this.carreraService.remove(id);
      if (!deletedCarrera) {
        throw new NotFoundException(`Carrera with ID ${id} not found.`);
      }
      return deletedCarrera;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}


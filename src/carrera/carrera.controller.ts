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
    description: 'Successful query, recovered career.',
    type: Carrera,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Empty' })
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
    description: 'Successfully retrieved Career.',
    type: Carrera,
  })
  @ApiNotFoundResponse({ status: 404, description: 'The requested career was not found.' })
  async findOne(@Param('id') id: number): Promise<Carrera> {
    try {
      const result = await this.carreraService.findOne(id);
      if (!result) {
        throw new NotFoundException(`The Career with ID ${id} is not found`);
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Career not found',
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
  @ApiNotFoundResponse({ status: 404, description: 'The requested career was not found.' })
  async search(@Query('query') query: string): Promise<Carrera[]> {
    try {
      const result = await this.carreraService.search(query);
      if (!result) {
        throw new NotFoundException(`The career ${query} is not found.`);
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Career not found.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiBody({ type: CreateCarreraDto })
  @ApiOkResponse({
    status: 200,
    description: 'The Career has been created successfully. ',
    type: CreateCarreraDto,
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createCarreraDto: CreateCarreraDto): Promise<Carrera> {
    try {
      if (!createCarreraDto || Object.keys(createCarreraDto).length === 0) {
        throw new HttpException(
          'The creation data is empty.',
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
        'Career not found.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiBody({ type: UpdateCarreraDto })
  @ApiOkResponse({
    status: 200,
    description: 'The Career has been successfully updated.',
    type: UpdateCarreraDto,
  })
  @ApiNotFoundResponse({ status: 404, description: 'The requested career was not found.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  async update(
    @Param('id') id: number,
    @Body() updateCarreraDto: UpdateCarreraDto,
  ) {
    try {
      if (!updateCarreraDto || Object.keys(updateCarreraDto).length === 0) {
        throw new BadRequestException('The data you want to update is empty.');
      }
      const result = await this.carreraService.update(id, updateCarreraDto);

      if (!result) {
        throw new NotFoundException(`The Career with ID ${id} is not found.`);
      }

      return result;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new Error('Career not found.');
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    status: 200,
    description: 'The selected Career has been successfully deleted.',
    type: Carrera,
  })
  @ApiNotFoundResponse({ status: 404, description: 'The requested career was not found.' })
  async remove(@Param('id') id: number): Promise<Carrera> {
    try {
      const deletedCarrera = await this.carreraService.remove(id);
      if (!deletedCarrera) {
        throw new NotFoundException(`The Career with ID ${id} is not found.`);
      }
      return deletedCarrera;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Career not found.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}


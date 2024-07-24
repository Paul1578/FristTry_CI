import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
  } from '@nestjs/common';
  import {
    ApiBadRequestResponse,
    ApiBody,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
  } from '@nestjs/swagger';
  import { EstudiantesService } from './estudiantes.service';
  import { Estudiantes } from './entities/estudiantes.entity';
  import { CreateEstudiantesDto } from './dto/CreateEstudiantes.dto';
  import { UpdateEstudiantesDto } from './dto/UpdateEstudiantes.dto';
  
  
  @ApiTags('Estudiante')
  @Controller('Estudiante')
  export class EstudiantesController {
    constructor(private readonly estudiantesService: EstudiantesService) {}
  
    @Get()
    @ApiOkResponse({
      status: 200,
      description: 'The query has been successfully.',
      type: Estudiantes,
    })
    @ApiNotFoundResponse({ status: 404, description: 'Sin entidades.' })
    async findAll(): Promise<Estudiantes[]> {
      try {
        const result = await this.estudiantesService.findAll();
        if (result.length == 0) {
          throw new NotFoundException(`Sin entidades`);
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
      type: Estudiantes,
    })
    @ApiNotFoundResponse({ status: 404, description: 'Estudiante no encontrado.' })
    async findOne(@Param('id') id: number): Promise<Estudiantes> {
      try {
        const result = await this.estudiantesService.findOne(id);
        if (!result) {
          throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
        }
        return result;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(
          'Estudiante no encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Get('/search/by')
    @ApiOkResponse({
      status: 200,
      description: 'The query has been successful.',
      type: Estudiantes,
    })
    @ApiNotFoundResponse({ status: 404, description: 'Estudiante no encontrado.' })
    async search(@Query('query') query: string): Promise<Estudiantes[]> {
      try {
        const result = await this.estudiantesService.search(query);
        if (!result) {
          throw new NotFoundException(`Estudiante con ${query} no encontrado`);
        }
        return result;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(
          'Estudiante no encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Post()
    @ApiBody({ type: CreateEstudiantesDto })
    @ApiOkResponse({
      status: 200,
      description: 'El Estudiante fue creado exitosamente .',
      type: CreateEstudiantesDto,
    })
    @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
    async create(@Body() createEstudiantesDto: CreateEstudiantesDto): Promise<Estudiantes> {
      try {
        if (!createEstudiantesDto || Object.keys(createEstudiantesDto).length === 0) {
          throw new HttpException(
            'Sin datos para crear.',
            HttpStatus.BAD_REQUEST,
          );
        }
  
        const result = await this.estudiantesService.create(createEstudiantesDto);
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
    @ApiBody({ type: UpdateEstudiantesDto })
    @ApiOkResponse({
      status: 200,
      description: 'El estudiante fue actualizado exitosamente.',
      type: UpdateEstudiantesDto,
    })
    @ApiNotFoundResponse({ status: 404, description: 'Estudiante no encontrado.' })
    @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
    async update(
      @Param('id') id: number,
      @Body() updateEstudiantesDto: UpdateEstudiantesDto,
    ) {
      try {
        if (!updateEstudiantesDto || Object.keys(updateEstudiantesDto).length === 0) {
          throw new BadRequestException('Update data is empty.');
        }
        const result = await this.estudiantesService.update(id, updateEstudiantesDto);
  
        if (!result) {
          throw new NotFoundException(`Estudiante con ID ${id} no encontrado.`);
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
      description: 'Estudiante borrado exitosamente.',
      type: Estudiantes,
    })
    @ApiNotFoundResponse({ status: 404, description: 'Estudiante no encontrado.' })
    async remove(@Param('id') id: number): Promise<Estudiantes> {
      try {
        const deletedEstudiantes = await this.estudiantesService.remove(id);
        if (!deletedEstudiantes) {
          throw new NotFoundException(`Estudiante con ID ${id} no encontrado.`);
        }
        return deletedEstudiantes;
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
  
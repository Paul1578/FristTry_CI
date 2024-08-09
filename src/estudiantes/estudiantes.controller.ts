import { BadRequestException, Body,  Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
      description: 'Successful query, recovered student.',
      type: Estudiantes,
    })
    @ApiNotFoundResponse({ status: 404, description: 'Empty.' })
    async findAll(): Promise<Estudiantes[]> {
      try {
        const result = await this.estudiantesService.findAll();
        if (result.length == 0) {
          throw new NotFoundException(`Empty.`);
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
      description: 'Successfully retrieved student.',
      type: Estudiantes,
    })
    @ApiNotFoundResponse({ status: 404, description: 'The requested student was not found.' })
    async findOne(@Param('id') id: number): Promise<Estudiantes> {
      try {
        const result = await this.estudiantesService.findOne(id);
        if (!result) {
          throw new NotFoundException(`The student with ID ${id} is not found.`);
        }
        return result;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(
          'Student not found.',
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
    @ApiNotFoundResponse({ status: 404, description: 'The requested student was not found.' })
    async search(@Query('query') query: string): Promise<Estudiantes[]> {
      try {
        const result = await this.estudiantesService.search(query);
        if (!result) {
          throw new NotFoundException(`The student ${query} is not found.`);
        }
        return result;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(
          'Student not found.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Post()
  @ApiBody({ type: CreateEstudiantesDto })
  @ApiOkResponse({
    status: 200,
    description: 'The student has been created successfully.',
    type: Estudiantes, // Cambia a la entidad de Estudiantes para la respuesta exitosa
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createEstudiantesDto: CreateEstudiantesDto): Promise<Estudiantes> {
    try {
      // Validar que los datos no estén vacíos
      if (!createEstudiantesDto || Object.keys(createEstudiantesDto).length === 0) {
        throw new HttpException('The creation data is empty.', HttpStatus.BAD_REQUEST);
      }

      // Manejar campos opcionales
      if (createEstudiantesDto.proyectoEmpresarialId === null) {
        createEstudiantesDto.proyectoEmpresarialId = null;
      }

      // Llamar al servicio para crear el estudiante
      const result = await this.estudiantesService.create(createEstudiantesDto);
      return result;
    } catch (error) {
      console.error(error); // Asegúrate de que el error se registre adecuadamente
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Student not created.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
    @Put(':id')
    @ApiBody({ type: UpdateEstudiantesDto })
    @ApiOkResponse({
      status: 200,
      description: 'The student has been successfully updated.',
      type: UpdateEstudiantesDto,
    })
    @ApiNotFoundResponse({ status: 404, description: 'The requested student was not found.' })
    @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
    async update(
      @Param('id') id: number,
      @Body() updateEstudiantesDto: UpdateEstudiantesDto,
    ) {
      try {
        if (!updateEstudiantesDto || Object.keys(updateEstudiantesDto).length === 0) {
          throw new BadRequestException('The data you want to update is empty.');
        }
        const result = await this.estudiantesService.update(id, updateEstudiantesDto);
  
        if (!result) {
          throw new NotFoundException(`The student with ID ${id} is not found.`);
        }
  
        return result;
      } catch (error) {
        if (
          error instanceof NotFoundException ||
          error instanceof BadRequestException
        ) {
          throw error;
        }
        throw new Error('Student not found.');
      }
    }
  
    @Delete(':id')
    @ApiOkResponse({
      status: 200,
      description: 'The selected student has been successfully deleted.',
      type: Estudiantes,
    })
    @ApiNotFoundResponse({ status: 404, description: 'The requested student was not found.' })
    async remove(@Param('id') id: number): Promise<Estudiantes> {
      try {
        const deletedEstudiantes = await this.estudiantesService.remove(id);
        if (!deletedEstudiantes) {
          throw new NotFoundException(`The student with ID ${id} is not found.`);
        }
        return deletedEstudiantes;
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException(
          'Student not found.',
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

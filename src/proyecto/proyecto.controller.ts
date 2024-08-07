import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Proyecto } from './entities/proyecto.entity';
import { UpdateProjectDto } from './dto/UpdateProyecto.dto';
import { CreateProyectoDto } from './dto/CreateProyecto.dto';

@ApiTags('Proyecto')
@Controller('proyecto')
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}
  
    @Get()
    @ApiOkResponse({
      status: 200,
      description: 'Successful query, recovered project.',
      type: Proyecto,
    })
    @ApiNotFoundResponse({ status: 404, description: 'project not found or non-existent.' })
    async findAll(): Promise<Proyecto[]> {
      try {
        const result = await this.proyectoService.findAll();
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
      description: 'Successfully retrieved project.',
      type: Proyecto,
    })
    @ApiNotFoundResponse({ status: 404, description: 'The requested project was not found.' })
    async findOne(@Param('id') id: number): Promise<Proyecto> {
      try {
        const result = await this.proyectoService.findOne(id);
        if (!result) {
          throw new NotFoundException(`The project with ID ${id} is not found.`);
        }
        return result;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(
          'Project not found.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Get('/search/by')
    @ApiOkResponse({
      status: 200,
      description: 'The query has been successful.',
      type: Proyecto,
    })
    @ApiNotFoundResponse({ status: 404, description: 'The requested project was not found.' })
    async search(@Query('query') query: string): Promise<Proyecto[]> {
      try {
        const result = await this.proyectoService.search(query);
        if (!result) {
          throw new NotFoundException(`The project ${query} is not found.`);
        }
        return result;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(
          'Project not found.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Post()
    @ApiBody({ type: CreateProyectoDto })
    @ApiOkResponse({
      status: 200,
      description: 'The project has been created successfully.',
      type: CreateProyectoDto,
    })
    @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
    async create(@Body() createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
      try {
        if (!createProyectoDto || Object.keys(createProyectoDto).length === 0) {
          throw new HttpException(
            'The creation data is empty.',
            HttpStatus.BAD_REQUEST,
          );
        }
  
        const result = await this.proyectoService.create(createProyectoDto);
        return result;
      } catch (error) {
        console.log(error);
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException(
          'Project not found.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Put(':id')
    @ApiBody({ type: UpdateProjectDto })
    @ApiOkResponse({
      status: 200,
      description: 'The ptoject has been successfully updated.',
      type: UpdateProjectDto,
    })
    @ApiNotFoundResponse({ status: 404, description: 'The requested project was not found.' })
    @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
    async update(
      @Param('id') id: number,
      @Body() updateProyectoDto: UpdateProjectDto,
    ) {
      try {
        if (!updateProyectoDto || Object.keys(updateProyectoDto).length === 0) {
          throw new BadRequestException('The data you want to update is empty.');
        }
        const result = await this.proyectoService.update(id, updateProyectoDto);
  
        if (!result) {
          throw new NotFoundException(`The project with ID ${id} is not found.`);
        }
  
        return result;
      } catch (error) {
        if (
          error instanceof NotFoundException ||
          error instanceof BadRequestException
        ) {
          throw error;
        }
        throw new Error('Project not found.');
      }
    }
  
    @Delete(':id')
    @ApiOkResponse({
      status: 200,
      description: 'The selected project has been successfully deleted.',
      type: Proyecto,
    })
    @ApiNotFoundResponse({ status: 404, description: 'The requested project was not found.' })
    async remove(@Param('id') id: number): Promise<Proyecto> {
      try {
        const deletedProyecto = await this.proyectoService.remove(id);
        if (!deletedProyecto) {
          throw new NotFoundException(`The project with ID ${id} is not found.`);
        }
        return deletedProyecto;
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException(
          'Project not found.',
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}




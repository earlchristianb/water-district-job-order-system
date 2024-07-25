import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AreaCodeService } from './area-code.service';
import { CreateAreaCodeDto, UpdateAreaCodeDto } from './dto/area-code.dto';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import AreaCodeResponseSamples from './response-example/area-code.swagger';
import { v4 as uuidv4 } from 'uuid';

@ApiBearerAuth()
@ApiTags('area-code')
@Controller('area-code')
export class AreaCodeController {
  constructor(private readonly areaCodeService: AreaCodeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all area codes' })
  @ApiResponse({
    status: 200,
    description: 'Returns List of Area Codes',
    example: [
      AreaCodeResponseSamples.AreaCodeResponseBodyExample(),
      AreaCodeResponseSamples.AreaCodeResponseBodyExample(),
      AreaCodeResponseSamples.AreaCodeResponseBodyExample(),
    ],
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/AreaCode',
          },
        },
      },
    },
  })
  findAll() {
    return this.areaCodeService.findAll();
  }

  @ApiParam({
    name: 'id',
    description: 'Area code id',
    example: uuidv4(),
  })
  @ApiOperation({ summary: 'Get area code by id' })
  @ApiFoundResponse({
    status: 200,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/AreaCode',
        },
      },
    },
    example: AreaCodeResponseSamples.AreaCodeResponseBodyExample(),
  })
  @ApiNotFoundResponse({
    status: 404,
    example: AreaCodeResponseSamples.AreaCodeNotFoundResponseExample,
  })
  @Get(':id')
  @ApiOperation({ summary: 'Create a new area code' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          examples: ['AB,ABA'],
          maxLength: 3,
          minLength: 2,
        },
        description: { type: 'string' },
      },
      required: ['code', 'description'],
    },
  })
  @ApiCreatedResponse({
    status: 201,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/AreaCode',
        },
      },
    },
    example: AreaCodeResponseSamples.AreaCodeResponseBodyExample(),
  })
  @ApiConflictResponse({
    status: 409,
    description:
      'When trying to create an area code with a code that already exists',
    example: AreaCodeResponseSamples.AreaCodeConflictResponseExample,
  })
  @Post()
  create(@Body() data: CreateAreaCodeDto) {
    return this.areaCodeService.create(data);
  }

  @ApiParam({
    name: 'id',
    description: 'Area code id',
    example: uuidv4(),
  })
  @ApiOperation({
    summary: 'Update an area code',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          examples: ['AB,ABA'],
          maxLength: 3,
          minLength: 2,
        },
        description: {
          type: 'string',
          examples: ['Area code for (name of place)'],
        },
      },
      required: [],
    },
  })
  @ApiOkResponse({
    status: 200,
    description: 'Returns the updated area code record',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/AreaCode',
        },
      },
    },
    example: AreaCodeResponseSamples.AreaCodeResponseBodyExample(),
  })
  @ApiConflictResponse({
    description:
      'When trying to update an area code with a code that already exists',
    status: 409,
    example: AreaCodeResponseSamples.AreaCodeConflictResponseExample,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateAreaCodeDto) {
    return this.areaCodeService.update(id, data);
  }
}

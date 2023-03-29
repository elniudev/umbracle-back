import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseIntPipe, HttpStatus, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  async createCategory(@Body() category: CreateCategoryDto) {
    
    return this.categoryService.createCategory(category);
  }

  @Get()
  getCategorys():Promise<Category[]> {
    return this.categoryService.getCategorys();
  }

  @Get('/:idCategory')
  async getCategory(@Res()res:any, @Param('idCategory', ParseIntPipe) idCategory: number) {
    const category = await this.categoryService.getCategory(idCategory)
    return res.status(HttpStatus.OK).json(category); 
  }

  @Get('/name/:idCategory')
  async getCategoryByName(@Res()res:any, @Param('idCategory') nameCategory: string) {
    const category = await this.categoryService.getCategoryByName(nameCategory)
    return res.status(HttpStatus.OK).json(category); 
  }  

  @Put('/:idCategory')
  updateCategory(@Param('idCategory') idCategory: string, @Body() category:UpdateCategoryDto) {
    return this.categoryService.updateCategory(Number(idCategory), category);
  }

  @Delete('/:idCategory')
  deleteCategory(@Param('idCategory', ParseIntPipe) idCategory: number){
    return this.categoryService.deleteCategory(idCategory)
  }
}
 
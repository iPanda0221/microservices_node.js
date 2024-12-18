import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class createProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  stock: number;
}

export class UpdateProductRequest {
  name?: string;

  description?: string;

  @Min(1)
  price?: number;

  stock?: number;
}

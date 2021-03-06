import { Sku } from './sku';
import { ProductPicture } from './product-picture';
import { Category } from '../category/category';
import { Service } from '../product-service/product-service';
import { Brand } from "../brand/brand";
import { TechnicalInformation } from "./product-technical-information";

export class Product {
    id: string;
    relatedProductsId: string;
    baseCategory: Category;
    name: string;
    urlTo: string;
    description: string;
    briefDescription: string;
    technicalInformation: TechnicalInformation[] = [];
    brand: Brand;
    installmentLimit: number;
    plusFreight: number;
    daysProcessing: number;
    file: string;
    metaTagTitle: string;
    metaTagDescription: string;
    skuBase: Sku;
    skus: Sku[] = [];
    categories: Category[] = [];
    shippingCompanies: Object[] = [];
    crossSelling: Object[] = [];
    upSelling: Object[] = [];
    crossSellingComplete: Product[] = [];
    upSellingComplete: Product[] = [];
    services: Service[] = [];
    pictures: ProductPicture[] = [];
    areaSizer: number;
    lossPercentage: number;
    createdDate: Date;
    status: boolean;
    information: string;
    selfColor: boolean;
    additionalFreightPrice: number;
    installmentValue: number;
    installmentNumber: number;
    showInstallment: boolean;
    installmentText: string;
    fileGuide: string;
    videoEmbed: string;
    videoUrl: string;

    /*Produto Order*/
    quantity: number;
    totalUnitPrice: number;
    sku: Sku;
}
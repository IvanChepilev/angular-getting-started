import { Component, OnDestroy } from "@angular/core";
import { IProduct } from "./product";
import { OnInit } from "@angular/core";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";


@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    constructor(private productService: ProductService) { }
    pageTitle: string = 'Product List'
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;

    private _listFilter: string = '';
    public get listFilter(): string {
        return this._listFilter;
    }
    public set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];


    products: IProduct[] = [
    ];

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLowerCase().includes(filterBy));
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err

        })
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
} 
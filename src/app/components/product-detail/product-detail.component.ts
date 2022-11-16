import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from '../../services/product.service';
import { LoaderService } from '../../shared/components/loader/loader.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product: Product = {
    name: '',
    description: '',
    price: 0,
    status: false,
    category: {
      name: '',
      slug: ''
    },
    brand: {
      name: '',
      slug: ''
    },
    slug: ''
  };

  public form!: FormGroup;
  public data: any;

  constructor(
    protected fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    private loaderService: LoaderService,
  ) {
    this.data = dataModal;
  }

  async ngOnInit() {
    this.initForm();
  }

  async initForm() {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, this.validateFormat, Validators.maxLength(19)])],
      category: this.fb.group({
        name: ['', Validators.compose([Validators.required, this.validateFormat, Validators.maxLength(19)])],
        slug: ['']
      }),
      brand: this.fb.group({
        name: ['', Validators.compose([Validators.required, this.validateFormat, Validators.maxLength(19)])],
        slug: ['']
      }),
      slug: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(27), this.validateFormat])],
    });

    if(this.data){
      this.loaderService.show();
      this.productService.getProduct(this.data)
        .pipe(
          finalize(() => this.loaderService.hide())
        )
        .subscribe( (res) => {
          this.product = res;
          this.form.patchValue(this.product);
          console.log(this.form)

        }
      )
    }
  }

  private validateFormat(control: AbstractControl): ValidationErrors | null {
    const name = control.value;
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(name)) {
      return { validateFormat: true };
    }
    return null;
  }

  convertToSlug(event: any) {

    const value = event.target.value;

    console.log(value)

  return  value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

  }

  submitProduct() {
    const payload = {
      name: this.form.get('name')?.value ,
      category: {
        name: this.form.get('category.name')?.value,
        slug: this.form.get('category.slug')?.value.toLowerCase().replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').replace(/^\s+|\s+$/gm,'').replace(/\s+/g, '-')
      },
      brand: {
        name: this.form.get('brand.name')?.value,
        slug: this.form.get('brand.slug')?.value.toLowerCase().replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').replace(/^\s+|\s+$/gm,'').replace(/\s+/g, '-')
      },
      slug: this.form.get('slug')?.value.toLowerCase().replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').replace(/^\s+|\s+$/gm,'').replace(/\s+/g, '-'),
      description: this.form.get('description')?.value,
      price: this.form.get('price')?.value,
    }

    console.log(payload)

    if(this.data === undefined) {
      this.productService.createProduct(payload)
        .subscribe(
          res => {
            console.log(res);
            this.dialogRef.close({
              data:true
            });
          },
          err => console.log(err)
      )
    } else {
      delete this.product.createdAt;
      this.productService.updateProduct(this.data, payload)
      .subscribe(
        res => {
          console.log(res);
          this.dialogRef.close({
            data: true
          });
        },
        err => console.log(err)
      )
    }
  }

  closeDialog() {
    this.dialogRef.close({
      data:false
    });
  }

}

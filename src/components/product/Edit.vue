<template>
    <div class="container">
        <form @submit.prevent="handleUpdateProductSubmit">
            <div class="form-group">
                <label for="title">Product Title</label>
                <input type="text" class="form-control" id="title" v-model="product.product_title"
                       name="product_title"
                       v-validate="productValidations.product_title"
                       placeholder="Product Title">
                <span class="text-danger" v-show="errors.has('product_title')">{{
                        errors.first('product_title')
                    }}</span>
            </div>
            <div class="form-group">
                <label for="description">Product Description</label>
                <textarea class="form-control" id="description"
                          v-model="product.product_description"
                          name="product_description"
                          v-validate="productValidations.product_description"
                          placeholder="Product Description"></textarea>
                <span class="text-danger"
                      v-show="errors.has('product_description')">{{ errors.first('product_description') }}</span>
            </div>
            <div class="form-group">
                <label for="file">Product Image</label>
                <input type="file" class="form-control"
                       id="file"
                       name="image"
                       ref="file"
                       v-on:change="handleOnChangeFile">
            </div>

            <div class="form-group">
                <label for="price">Product Price</label>
                <input type="text" class="form-control" id="price" v-model="product.price"
                       name="price"
                       v-validate="productValidations.price"
                       placeholder="Product Price">
                <span class="text-danger" v-show="errors.has('price')">{{ errors.first('price') }}</span>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>

import Vue from 'vue'
import VeeValidate from 'vee-validate'

let veeCustomMessage = {
    en: {
        custom: {
            title: {
                required: 'Product title field is required'
            },
            description: {
                required: 'Product description field is required',
            },
            image: {
                required: 'Product image field is required',
            },
            price: {
                required: 'Product price field is required',
            }
        }
    }
};

let productObj = {
    product_title: '',
    product_description: '',
    image: '',
    price: ''
};

Vue.use(VeeValidate, {
    dictionary: veeCustomMessage,
    fieldsBagName: productObj
});

export default {
    name: "Create",
    data() {
        return {
            product: productObj,
            productValidations: {
                product_title: {
                    required: true
                },
                product_description: {
                    required: true
                },
                price: {
                    required: true,
                    numeric: true
                }
            },
        }
    },
    methods: {
        handleUpdateProductSubmit() {
            this.$validator.validateAll().then(isValid => {
                if (isValid) {
                    let formData = new FormData();
                    formData.append('image', this.product.image);
                    formData.append('price', this.product.price);
                    formData.append('product_description', this.product.product_description);
                    formData.append('product_title', this.product.product_title);

                    axios.post(this.$env.BACKEND_API + `api/v1/product/${this.$route.params.id}`, formData)
                        .then(res => {
                            if (res.data.status === 'validation' || res.data.status === 'failed') {
                                this.$notification.error(this, 'Error', res.data.message);
                            } else if (res.data.status === 'success') {
                                this.handleResetProductForm();
                                this.$notification.notify(this, 'Success', res.data.message);
                                this.$router.push({name: 'ProductList'});
                            } else {
                                this.$notification.error(this, 'Error', 'Somethings went wrong');
                            }
                        })
                        .catch(err => {
                            this.$notification.error(this, 'Error', 'Somethings went wrong');
                        })
                }
            });
        },
        handleOnChangeFile: function () {
            this.product.image = this.$refs.file.files[0];
        },
        handleResetProductForm() {
            this.product.product_title = '';
            this.product.product_description = '';
            this.product.price = '';
            this.product.image = '';
        },
        handleGetProductDetails(productID) {
            axios.get(this.$env.BACKEND_API + `api/v1/product/${productID}`)
                .then(res => {
                    this.product.product_title = res.data.product_title;
                    this.product.product_description = res.data.product_description;
                    this.product.price = res.data.price;
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    mounted() {
        this.handleGetProductDetails(this.$route.params.id)
    }
}
</script>

<style scoped>

</style>

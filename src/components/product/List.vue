<template>
    <div class="container">
        <router-link :to="{name: 'ProductCreate'}" class="btn btn-outline btn-success">Add New Product</router-link>
        <vuetable ref="vuetable"
                  :api-url="url"
                  :http-options="headerOptions"
                  :fields="tableRowsFields"
                  pagination-path=""
                  :css="css.table"
                  @vuetable:loading="showLoader"
                  @vuetable:loaded="hideLoader"
                  @vuetable:pagination-data="onPaginationData"
        >
            <template slot="description" slot-scope="props">
                {{ props.rowData.product_description|truncate(30, '...') }}
            </template>
            <template slot="image" slot-scope="props">
                <img :src="props.rowData.image" alt="" class="img-size">
            </template>
            <template slot="actions" slot-scope="props">
                <button class="btn btn-simple btn-xs btn-danger btn-icon remove"
                        @click="handleProductDelete(props.rowData)">
                    <i class="fa fa-close"></i>
                </button>
                <router-link :to="{name: 'ProductEdit', params: { id: props.rowData.id }}" class="btn btn-simple btn-xs btn-warning btn-icon">
                    <i class="fa fa-pencil"></i>
                </router-link>
                <router-link :to="{name: 'ProductDetails', params: { id: props.rowData.id }}" class="btn btn-simple btn-xs btn-success btn-icon">
                    <i class="fa fa-eye"></i>
                </router-link>
            </template>
        </vuetable>
        <div class="vuetable-pagination ui basic segment grid">
            <vuetable-pagination-info ref="paginationInfo">
            </vuetable-pagination-info>

            <vuetable-pagination ref="pagination" :css="css.pagination"
                                 @vuetable-pagination:change-page="onChangePage"
            ></vuetable-pagination>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";

import {MessageBox} from 'element-ui';

Vue.prototype.$confirm = MessageBox.confirm;

var filter = function (text, length, clamp) {
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    var content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);

export default {
    name: "List",
    components: {
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
    },
    data() {
        return {
            url: this.$env.BACKEND_API + 'api/v1/product',
            css: {
                table: {
                    tableClass: "table table-striped table-bordered",
                    ascendingIcon: "glyphicon glyphicon-chevron-up",
                    descendingIcon: "glyphicon glyphicon-chevron-down",
                    handleIcon: "glyphicon glyphicon-menu-hamburger",
                    renderIcon: function (classes, options) {
                        return `<span class="${classes.join(' ')}"></span>`
                    }
                },
                paginationInfo: {
                    infoClass: 'pull-left'
                },
                pagination: {
                    wrapperClass: "pagination pull-right",
                    activeClass: "btn btn-primary",
                    disabledClass: "disabled",
                    pageClass: "btn btn-default",
                    linkClass: "btn btn-default",
                    icons: {
                        first: "",
                        prev: "",
                        next: "",
                        last: ""
                    }
                }
            },
            filterText: '',
            moreParams: {},
            tableRowsFields: [
                {
                    name: 'product_title',
                    title: 'Title'
                },
                {
                    name: '__slot:description',
                    title: 'Description',
                },
                {
                    name: 'creator',
                    title: 'Creator',
                    callback: function (creator) {
                        return creator.name;
                    }
                },
                {
                    name: 'price',
                    title: 'Price',
                    callback: function (price) {
                        return price + 'TK';
                    }
                },
                {
                    name: '__slot:image',
                    title: 'Image',
                },
                {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'center aligned',
                    dataClass: 'center aligned',
                }
            ],
            headerOptions: {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}},
        }
    },
    methods: {
        onPaginationData(paginationData) {
            this.$refs.pagination.setPaginationData(paginationData);
            this.$refs.paginationInfo.setPaginationData(paginationData)
        },
        onChangePage(page) {
            this.$refs.vuetable.changePage(page)
        },

        showLoader() {
            this.loading = true;
        },
        hideLoader() {
            this.loading = false;
        },
        handleProductDelete(data) {
            this.$confirm('This will delete the food "' + data.product_title + '". Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                axios.delete(this.$env.BACKEND_API + `api/v1/product/${data.id}`)
                    .then(res => {
                        if (res.data.status === 'failed') {
                            this.$notification.error(this, 'Error', res.data.message);
                        } else if (res.data.status === 'success') {
                            this.$notification.notify(this, 'Success', res.data.message);
                            this.$refs.vuetable.refresh();
                        } else {
                            this.$notification.error(this, 'Error', 'Somethings went wrong');
                        }
                    })
                    .catch(err => {
                        this.$notification.error(this, 'Error', 'Somethings went wrong');
                    })
            })
                .catch(() => {

                })
        }
    }
}
</script>

<style scoped>
.img-size {
    width: 70px;
    height: 50px;
}
</style>

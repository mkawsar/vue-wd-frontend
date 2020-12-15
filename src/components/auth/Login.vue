<template>
    <div class="login-form">
        <form method="post" @submit.prevent="login">
            <h2 class="text-center">Sign In</h2>
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><span class="fa fa-user"></span></span>
                    </div>
                    <input type="email"
                           class="form-control"
                           placeholder="Email"
                           v-model="user.email"
                           name="email"
                           v-validate="userValidations.email">
                </div>
                <span class="text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="fa fa-lock"></i>
                    </span>
                    </div>
                    <input type="password" class="form-control"
                           placeholder="Password"
                           v-model="user.password"
                           name="password"
                           v-validate="userValidations.password">
                </div>
                <span class="text-danger" v-show="errors.has('password')">{{ errors.first('password') }}</span>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Log in</button>
            </div>
        </form>
    </div>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'

let veeCustomMessage = {
    en: {
        custom: {
            email: {
                required: 'Email field is required',
                email: '',
            },
            password: {
                required: 'Password field is required',
            }
        }
    }
};

let userObj = {
    email: '',
    password: ''
};

Vue.use(VeeValidate, {
    dictionary: veeCustomMessage,
    fieldsBagName: userObj
});

export default {
    name: "Login",
    data() {
        return {
            user: userObj,
            userValidations: {
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                    min: 6
                }
            },
            loader: false,
        }
    },
    methods: {
        login() {
            this.$validator.validateAll().then(isValid => {
                if (isValid) {
                    let formData = new FormData();
                    formData.append('email', this.user.email);
                    formData.append('password', this.user.password);
                    axios.post(this.$env.BACKEND_API + 'api/v1/auth/login', formData)
                        .then(res => {
                            Object.keys(res.data).forEach((key) => {
                                this.$localStorage.set(key, res.data[key]);
                            });
                            this.redirectToHome();
                            this.loader = false;
                        })
                        .catch(err => {
                            this.$notification.notifyError(this, err.response.data);
                        })
                }
            });
        },
        redirectToHome: function () {
            this.$router.push('/');
            this.reset();
        },
        reset: function () {
            this.user.email = '';
            this.user.password = '';
        }
    }
}
</script>

<style scoped>
.login-form {
    width: 340px;
    margin: 50px auto;
}

.login-form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
}

.login-form h2 {
    margin: 0 0 15px;
}

.form-control, .btn {
    min-height: 38px;
    border-radius: 2px;
}

.input-group-addon .fa {
    font-size: 18px;
}

.btn {
    font-size: 15px;
    font-weight: bold;
}

.bottom-action {
    font-size: 14px;
}
</style>

<template>
	<div class="login">
		<div class="login-box">
			<div class="login-box-warpper">
				<div class="login-box-title">
					用户登录
				</div>
				<div class="login-box-content">
					<div class="verification pa">{{errorText}}</div>
					<div class="username">
            <div class="flex-box">
              <div class="iconsize">
                <Icon color="#03aefe" slot="prepend" type="person" size="18" />
              </div>
              <input
                v-model="info.username"
                class="nampassinput"
                :autofocus="true"
                size="large"
                placeholder="请输入账号"
                @focus="usernameFocus"
                @keyup.enter="commit">
            </div>
						<transition name="fade">
							<div v-show="showUsernameVer" class="verification">用户名不能为空</div>
						</transition>
					</div>
					<div class="password">
            <div class="flex-box">
              <div class="iconsize">
                <Icon color="#03aefe" slot="prepend" type="locked" size="18" />
              </div>
              <input
                v-model="info.password"
                class="nampassinput"
                size="large"
                type="password"
                placeholder="请输入密码"
                @focus="passwordFocus"
                @keyup.enter="commit">
            </div>
						<transition name="fade">
							<div v-show="showPasswordVer" class="verification">密码不能为空</div>
						</transition>
					</div>
					<div class="code">
						<Row>
							<Col span="12">
							  <input
                  v-model="info.code"
                  class="inputyanzheng"
                  size="large"
                  placeholder="请输入验证码"
                  style="width: 115px;"
                  @focus="codeFocus"
                  @keyup.enter="commit">
							</Col>
							<Col span="12">
							  <div class="login-code" @click="createCode" v-html="info.codeWrite"></div>
							</Col>
						</Row>
						<transition name="fade">
							<div v-show="showCodeVer" class="verification">验证码不能为空</div>
						</transition>
						<transition name="fade">
							<div v-show="codeError" class="verification">验证码错误</div>
						</transition>
					</div>
					<div class="login-box-commit" @click="commit">
						<Button type="info" :loading="showLoading" long>
							<span v-if="!showLoading">登录</span>
							<span v-else>登录中...</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Login } from 'api/login'
	import { setUserIng, removeAction } from 'common/js/util'
	import { ERR_OK } from 'api/config'

	export default {
	  data () {
	    return {
	      errorText: '',
	      info: {
	        username: '',
	        password: '',
	        code: '',
	        codeWrite: ''
	      },
	      showErro: false,
	      showUsernameVer: false,
	      showPasswordVer: false,
	      showCodeVer: false,
	      showLoading: false,
	      codeError: false,
	      loginErrNum: 0
	    }
	  },
	  created () {
	    this.createCode()
	  },
	  methods: {
	    usernameFocus () {
	      this.showUsernameVer = false
	    },
	    passwordFocus () {
	      this.showPasswordVer = false
	    },
	    codeFocus () {
	      this.showCodeVer = false
	    },
	    createCode () {
	      this.info.codeWrite = ''
	      let codeLength = 4
	      // 验证码的长度
	      let codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
	        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
	        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
	      ]
      // 所有候选组成验证码的字符，当然也可以用中文的
      for (let i = 0; i < codeLength; i++) {
	        let charNum = Math.floor(Math.random() * 52)
	        this.info.codeWrite += codeChars[charNum]
	      }
	    },
	    codeWrite () { },
	    commit () {
	      this.codeError = false
	      if (this.info.code && this.info.code.toUpperCase() !== this.info.codeWrite.toUpperCase()) {
	        this.codeError = true
	        this.createCode()
	        this.info.code = ''
	        return
	      }
	      if (this.showLoading) {
	        return
	      }
	      if (!this.info.username) {
	        this.showUsernameVer = true
	      }
	      if (!this.info.password) {
	        this.showPasswordVer = true
	      }
	      if (!this.info.code) {
	        this.showCodeVer = true
	      }
	      if (this.showUsernameVer || this.showPasswordVer || this.showCodeVer) {
	        return
	      }
        this.showLoading = true
        let struser = {
          'username': this.info.username,
          'password': this.info.password
        }
	      Login(struser).then(res => {
	        if (res) {
            console.log(res)
	          removeAction()
	          this.showLoading = false
	          if (res.code === 200) {
	            this.$Loading.finish()
	            setUserIng(res.token)
	            this.$router.push('/topnav/sys/user')
	          }
	        } else {
	          this.info.username = ''
	          this.info.password = ''
	          this.info.code = ''
	          this.createCode()
	        }
	      })
	    }
	  }
	}
</script>
<style scoped lang="scss">
  // @import '~common/scss/color';

	.login {
		width: 100%;
		height: 100%;
		background-color: #000;
		// background: url(./img/LG.png);
		background-size: cover;
		.login-box {
			width: 300px;
			height: 300px;
			position: absolute;
			top: 0;
			bottom: 0;
			right: 100px;
			margin: auto 0;
			.login-box-title {
				width: 100%;
				text-align: center;
				font-size: 20px;
				font-weight: 700;
				color: #0399e2;
				padding: 20px 0 15px;
			}
			.login-box-warpper {
				width: 100%;
				height: 100%;
        border: 2px solid #0472b2;
        border-radius: 18px;
				// background-color: rgba(0, 0, 0, .4);
				position: relative;
				.login-box-content {
					width: 240px;
					margin: 0 auto;
					.pa{
						position: absolute;
						top: 46px !important;
					}
					.username,
          .password  {
            margin-bottom: 20px;
            width: 100%;
            position: relative;
            > .flex-box {
              display: flex;
              align-items: center;
              .iconsize {
                border: 1px solid #03afff;
                width: 36px;
                height: 36px;
                border-radius: 5px 0 0 5px;
                text-align: center;
                padding-top: 7px;
              }
              .nampassinput {
                border-radius: 0 5px 5px 0;
                background-color: rgba(6, 16, 72, 0.2);
                height: 36px;
                padding-left: 8px;
                color: #fff;
                border: 1px solid #03afff;
                border-left: none;
                flex: 1;
              }
            }
          }
					.verification {
            position: absolute;
						// color: $color-yellow;
						font-size: 12px;
					}
					.login-code {
						width: 95%;
						height: 36px;
						background-color: #dcdcdc;
						margin-left: 5%;
						letter-spacing: 3px;
						font-size: 26px;
						font-weight: bold;
						line-height: 36px;
						color: blue;
						text-align: center;
						cursor: pointer;
						user-select: none;
					}
					.login-box-commit {
						margin-top: 20px;
					}
				}
			}
		}
  }
  .inputyanzheng {
    border-radius: 5px;
    background-color: rgba(6, 16, 72, 0.2);
    height: 36px;
    padding-left: 8px;
    color: #fff;
    border: 1px solid #03afff;
  }
</style>

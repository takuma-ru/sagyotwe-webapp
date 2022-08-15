<template>
  <button
    v-if="userProfile.userProfile.value.uid"
    id="twitter-signin-button"
    @click="auth.trySignOut()"
  >
    <div class="text">
      <Icon
        color="white"
        style="margin-right: 8px"
      >
        logout
      </Icon>
      サインアウト
    </div>
  </button>
  <button
    v-else
    id="twitter-signin-button"
    @click="auth.trySignIn()"
  >
    <div class="text">
      <div class="logo" />
      Twitterでサインイン
    </div>
  </button>
</template>

<script lang="ts" setup>
import Icon from '../Icon.vue'
import { useAuth } from '~~/composables/firebase/auth'
import { useUserProfileStore } from '~~/store/userProfileStore.js'

const userProfile = useUserProfileStore()

const auth = useAuth()

</script>

<style lang="scss">
#twitter-signin-button {
  display: flex;
  align-items: center;

  position: relative;
  width: auto;
  height: 40px;

  border: none;
  border-radius: 8px;
  background-color: #1DA1F2;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color:rgba(0,0,0,0);

  .text {
    display: inline-flex;
    position: relative;
    z-index: 1;
    margin: 0rem 1rem;

    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #FFF;

    justify-content: center;
    align-items: center;
    vertical-align: middle;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .logo {
      min-width: 24px;
      min-height: 24px;
      margin-right: 8px;

      background-image: url(../../assets/twitter/twitter_logo_white.svg);
      background-repeat: no-repeat;
      background-position: center center;
    }

    svg {
      path {
        fill: #FFF;
      }
    }
  }

  &:hover::before {
    position: absolute;
    z-index: 2;
    content: '';
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;

    border-radius: 8px;
    background-color: #CCCCCC2D;
  }
}
</style>

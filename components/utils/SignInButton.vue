<template>
  <button
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
import useAuth from '~~/composables/firebase/auth'
import { useColorStore } from '~~/store/color.js'
import { useUserProfileStore } from '~~/store/userProfileStore.js'

const {
  getColor
} = useColorStore()

useUserProfileStore()

const auth = useAuth()

</script>

<style lang="scss">
#twitter-signin-button {
  display: flex;
  align-items: center;

  position: relative;
  width: auto;
  height: 36px;

  border: none;
  border-radius: 0.4em;
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
    font-size: 14px;
    font-weight: bold;
    color: #FFF;

    justify-content: center;
    align-items: center;
    vertical-align: middle;

    .logo {
      width: 24px;
      height: 24px;
      margin-right: 8px;

      background-image: url(../../assets/twitter/TwitterSocialIcons_circle_white.svg);
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
